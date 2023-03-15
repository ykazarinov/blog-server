import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose';



import { registerValidation, loginValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'


// mongoose.connect('mongodb+srv://admin:GyccV8HSloqpIU3z@cluster0.hgxapfo.mongodb.net/francoislecoq?retryWrites=true&w=majority'

mongoose.connect(process.env.DB_ACCESS
).then(()=>{console.log('DB ok')
}).catch((err)=>{console.log('DB error', err)

})

const app = express();

app.use(express.json())



app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

// app.get('/posts', PostController.getAll)
// app.get('/posts/:id', checkAuth, PostController.getOne)
// app.post('/posts',  PostController.create)
// app.delete('/posts',  PostController.remove)
// app.patch('/posts',  PostController.update)



app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server OK')
})