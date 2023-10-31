
//import statements to import the services implementations
import {
        getmyposts,
        save,
        Signin,
        savePost,
        getAllPosts,
        likemyposts,
        unlikemyposts,
        commentOnMyPost, replyOnMyComment,
        delPost, getPostById
} from "../services/techbuddy-service.js";

//Controllers body to signup an user into TechBuddy
export const signup = async (request, response) => {
    console.log(request.body)
        const newUser = request.body;
        const savedUser = await save(newUser, response);
}

//Controllers body to signin the user into TechBuddy
export const signin = async (request, response) => {


        const newUser = request.body;
        const savedUser = await Signin(newUser, response);
}

//Controllers body to Create a new Post for the particular user
export const createNewPost = async (request, response) => {

        const newPost = request.body;
        const uservalue = request.user;
        const savedPost = await savePost(newPost, uservalue, response);

}

//Controllers body to retrieve all the posts 
export const retrieveAllPosts = async (request, response) => {

        const posts = await getAllPosts();
        response.status(200);
        response.json(posts);
}

//Controllers body to retrieve the posts created by the signed in user
export const retrieveMyPost = async (request, response) => {

        try {
                //console.log("user id ",request.user._id);
                const myposts = await getmyposts(request.user._id, response);
        }
        catch (err) {
                console.log(err);
        }
}

// Controllers body to delete the post created by user
// export const deleteMyPost = async(request, response) => {

// }

//Controllers body to like the post
export const likeMyPost = async (request, response) => {

        try {
                const likes = await likemyposts(request, response);
                response.status(200);
                response.json(likes);
        }
        catch (err) {
                console.log(err);
        }
}

//Controllers body to unlike the post
export const unlikeMyPost = async (request, response) => {

        try {
                const unlikes = await unlikemyposts(request, response);
                response.status(200);
                response.json(unlikes);
        }
        catch (err) {
                console.log(err);
        }
}

//Controllers body to comment on a post
export const commentOnPost = async (request, response) => {

        try {
                const comment = await commentOnMyPost(request, response);
                response.status(200);
                response.json(comment);
        }
        catch (err) {
                console.log(err);
        }
}

//Controllers body to reply on a comment tagged under the post
export const replyOnComment = async (request, response) => {

        try {
                const reply = await replyOnMyComment(request, response);
                response.status(200);
                response.json(reply);
        }
        catch (err) {
                console.log(err);
        }
}

//Controllers body to delete a post based on postID
export const deletePost = async (request, response) => {
        try {
                const deleted = await delPost(request, response);
        }
        catch (err) {
                console.log(err);
        }
}


// //Controller function to get a post by post id
// export const getPost = async (req, res) => {
//        try {
//                const post = await getPostById(req.params.postId);
//                if (!post) {
//                        return res.status(404).json({ message: 'Post not found' });
//                }
//                return res.status(200).json({ post });
//        } catch (error) {
//                return res.status(500).json({ message: 'Error getting post', error });
//        }

// };


//Controller function to get a post by post id
export const getPost = async (req, res) => {
        try {
                const post = await getPostById(req.params.postId);
                if (!post) {
                        return res.status(404).json({ message: 'Post not found' });
                }
                // Increment views count
                post.views++;
                await post.save();
                return res.status(200).json({ post });
        } catch (error) {
                return res.status(500).json({ message: 'Error getting post', error });
        }
};
