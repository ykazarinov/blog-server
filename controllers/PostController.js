import PostSchema from '../models/Post.js'


export const getLastTags = async(req, res) => {
    try{
        const posts = await PostSchema.find().limit(5).exec()
        const tags = posts
            .map(obj => obj.tags)
            .flat()
            .slice(0, 5)

        res.json(tags)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to get posts'
        })
    }
}

export  const getOne = async (req, res) => {
    try{
        const postId = req.params.id 
        const doc = await PostSchema.findOneAndUpdate(
            {
            _id: postId,
            }, 
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after',
            },

        ).populate('user').exec()
        if(doc){
            const {passwordHash, ...user_rest} = doc.user._doc
            const {user, ...post_rest} = doc._doc
            post_rest.user = user_rest
            res.json(post_rest)
        }
        else{
            res.status(404).json({
                message: 'Post not found'
            })
        }

            
       
        
    
    }
    catch(err){
                console.log(err)
                res.status(500).json({
                    message: 'Failed to get post'
                })
            }
}

export const remove = async (req, res) => {
    try{
        const postId = req.params.id
        const delPost = await PostSchema.findOneAndDelete({
        _id: postId,
      })
        if(delPost){
            res.json({
            success: true,
        })
      }else{
        res.status(404).json({
            message: 'Post not found'
        })
      }
      
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to get post'
        })
    }
}

export const getAll = async (req, res) => {
    try{
        const posts = await PostSchema.find().populate('user').exec()
        res.json(posts)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to get posts'
        })
    }
}

export const create = async (req, res) => {
    try{
        const doc = new PostSchema({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(' ').join('').split(','),
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to create post'
        })
    }
} 

export const update = async (req, res) => {
    try{
        const postId = req.params.id
        const updatePost = await PostSchema.updateOne({

            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags.split(' ').join('').split(','),

        })
        if(updatePost){
            res.json({
            success: true,
        })
      }else{
        res.status(404).json({
            message: 'Post not found'
        })
      }
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to update post'
        })
    }
}