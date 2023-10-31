//import respective components
import Express from 'express';
const app = Express();
import mongoose from 'mongoose';
const PORT = 5500;
import MONGOURI from '../keys.mjs';
// import { Grid } from 'gridfs-stream';
// import methodOverride from 'methodOverride';
// import multer from 'multer';
// import crypto from 'crypto';
// import GridFsStorage from 'multer-gridfs-storage';


import authRouter from './routes/auth.js';
import challengeRouter from './../server/routes/challenges-router.js';
import userRouter from './routes/user-router.js';
import submissionRouter from './routes/submission-router.js';
// import Post from './models/post.js';

// Use express.json middleware
app.use(Express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-access-token');
    next();
  });
// Using authRouter
app.use(authRouter);
app.use(userRouter);

// routes(app);
app.use(submissionRouter)
app.use(challengeRouter)
//Setting up connection to mongoDB using connection URI
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Verification of the connection
mongoose.connection.on('connected',() => {
    console.log("Connected to Mongo! Yeahh");
})
// app.use(Express.json())

//Error message highling errors while connecting
mongoose.connection.on('error',()=>{
    console.log("Error Connecting");
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})


export default app;

// router.delete('/deletepost/:postId', requireLogin,(req,res)=>{
//     Post.findOne({_id:req.params.postId})
//     .populate("postedBy","._id")
//     .exec((err, post) => {
//         if(err || !post){
//             return res.status(422).json({error:err})
//         }
//         if(post.postedBy._id.toString() === req.user._id.toString()){
//             post.remove()
//             .then(result => {
//                 res.json({message:"Successfully Deleted"})
//             }).catch(err => {
//                 console.log(err)
//             })
//         }
//     })
// })