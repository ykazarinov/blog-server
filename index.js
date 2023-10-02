import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose';

import multer from 'multer' 
import cors from 'cors'



import { registerValidation, loginValidation, postCreateValidation, commentCreateValidation } from './validations.js';

import {checkAuth, handleValidationErrors} from './utils/index.js';
import {UserController, PostController, CommentController} from './controllers/index.js'


mongoose.connect(process.env.DB_ACCESS
).then(()=>{console.log('DB ok')
}).catch((err)=>{console.log('DB error', err)

})

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (__, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))



app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register',  registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload',  upload.single('image'), (req, res) => {
    res.jsonp({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)

//-----posts--------
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth,  PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

//-----comments--------
app.post('/comments', checkAuth, commentCreateValidation, handleValidationErrors, CommentController.create)
app.get('/comments', CommentController.getLastComments)
app.get('/posts/:id/comments', CommentController.getPostComments)
app.get('/users/:id/comments', CommentController.getUserComments)
app.delete('/comments/:id', checkAuth, CommentController.remove)
app.patch('/comments/:id', checkAuth, commentCreateValidation, handleValidationErrors, CommentController.update)

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server OK')
})