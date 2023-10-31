//importing specific components from respective files
import express from 'express';
const router = express.Router();
import requireLogin from "../middleware/requireLogin.js"
import * as techbuddyController from "../controllers/techbuddy-controllers.js";

router.get('/protected',(req,res)=>{
    res.send("Hello User");
})

//signup functionality endpoint
router.route('/signup').post(techbuddyController.signup);

//signin functionality endpoint
router.route('/signin').post(techbuddyController.signin);

//retrieve all functionality endpoint
router.route('/allpost').get(techbuddyController.retrieveAllPosts);

//create posts functionality endpoint
router.route('/createpost').post(requireLogin,techbuddyController.createNewPost);

//retrieve my posts functionality endpoint
router.route('/mypost').get(requireLogin,techbuddyController.retrieveMyPost);

//like functionality endpoint
router.route('/like').put(requireLogin,techbuddyController.likeMyPost);

//unlike functionality endpoint
router.route('/unlike').put(requireLogin,techbuddyController.unlikeMyPost);

//comment functionality endpoint
router.route('/comment').put(requireLogin,techbuddyController.commentOnPost);

//replying on a particular comment functionality endpoint
router.route('/commentreply').put(requireLogin,techbuddyController.replyOnComment);

//deleting a post endpoint
router.route('/deletepost/:postId').delete(requireLogin,techbuddyController.deletePost);

//fetch a post by postid
router.route('/posts/:postId').get(requireLogin,techbuddyController.getPost);

//bookmark endpoints

export default router;