import CommentSchema from '../models/Comment.js'

export const create = async (req, res) => {
    try{
        const doc = new CommentSchema({
            text: req.body.text,
            user: req.userId,
            post: req.body.postId,
        })

        const comment = await doc.save()
        res.json(comment)
    }
    catch(err){
        console.warn(err)
        res.status(500).json({
            message: 'Failed to create comment'
        })
    }
}

export const getLastComments = async (req, res) => {
    try{
        const comments = await CommentSchema.find().populate('user').limit(5).exec()
        res.json(comments)
    }
    catch(err){
        console.warn(err)
        res.status(500).json({
            message: 'Failed to get comments'
        })
    }
}

export const getPostComments = async (req, res) => {
    try{
        const myPostId = req.params.id 
       
        const comments = await CommentSchema.find({post: myPostId}).populate('user').exec()
        res.json(comments)  
    }
    catch(err){
        console.warn(err)
        res.status(500).json({
            message: 'Failed to get comments'
        })
    }
    
}

export const getUserComments = async (req, res) => {
    try{
        const userId = req.params.id
        const comments = await CommentSchema.find({user: userId}).exec()
        res.json(comments)
    }
    catch(err){
        console.warn('Failed to get comments')
    }
}

export const remove = async (req, res) => {
    try{
        const commentId = req.params.id
       
        const delComment = await CommentSchema.findOneAndDelete({
            _id: commentId,
        })
        if(delComment){
            res.json({
                success:true,
            })
        }else{
            console.warn('commentId', commentId)
            res.status(404).json({
                message: 'Comment not found'
            })
        }
    }
    catch(err){
        console.warn(err)
        res.status(500).json({
            message: 'Failed to remove comment'
        })
    }
}

export const update = async (req, res) => {
    try{
        const commentId = req.params.id
        const updateComment = await CommentSchema.updateOne({
            _id: commentId,
        },{
            text: req.body.text,
            user: req.userId,
            post: req.body.postId,
        })
        if(updateComment){
            res.json({
                success: true,
            })
        }else{
            res.status(404).json({
                message: 'Comment not found'
            })
        }
    }
    catch(err){
        console.warn(err)
        res.status(500).json({
            message: 'Failed to update comment' 
        })
    }
}