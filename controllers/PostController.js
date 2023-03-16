import PostSchema from '../models/Post.js'

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

        )
        if(doc){
           res.json(doc) 
        }
        else{
            res.status(404).json({
                message: 'Article not found'
            })
        }

            
       
        
    
    }
    catch(err){
                console.log(err)
                res.status(500).json({
                    message: 'Failed to get article'
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
            message: 'Failed to get article'
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
            message: 'Failed to get articles'
        })
    }
}

export const create = async (req, res) => {
    try{
        const doc = new PostSchema({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to create article'
        })
    }
} 