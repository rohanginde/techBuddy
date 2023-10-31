//importing specific components from respective modules
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const User = mongoose.model("User");
import Post from "../models/post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../keys.mjs";

//Implementation of the signing up the user into Database
export const save = async (newUser, response) => {
  const name = newUser.name;
  const email = newUser.email;
  const username = newUser.username;
  const password = newUser.password;

  if (!email || !password || !name || !username) {
    return response.json({ error: "Please add all the fields" });
  }
  try {
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return response.json({ error: "User Already exists with that username" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return response.json({ error: "User Already exists with that email" });
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      username,
      password: hashedpassword,
      name,
      quiz: 0,
      level: "Level One",
    });

    const savedUser = await user.save();
    console.log("saved");
    return response.json({ message: "Saved Successfully" });
  } catch (err) {
    console.log("error signing in ", err);
    return response.json({ error: "Error saving user" });
  }
};

//Implementation of the signing the user into application
export const Signin = async (newUser, res) => {
  const email = newUser.email;
  const password = newUser.password;
  if (!email || !password) {
    return res.json({ error: "Please add email or password" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      //return createSessionToken(request.body.session);
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json({ token });
        } else {
          return res.status(422).json({ error: "Invalid Email or Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//Implementation of the saving the post into the database
export const savePost = async (req, userval, res) => {
  const title = req.title;
  const body = req.body;
  const tags = req.tags;
  const username = req.username;

  console.log("savepost",req)
  if (!title || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  const post = new Post({
    title,
    body,
    username,
    tags,
  });
  // userval.password = undefined;
  // userval.email = undefined;
  // userval.quiz = undefined;
  // userval.level = undefined;
  const result = await post.save();
  if (result) {
    return res.status(200).json({ post: result });
  } else {
    return res.status(400).json("error");
  }
};

//Implementation of the retrieving all the posts from Database
export const getAllPosts = async () => {
  try {
    const posts = Post.find().populate("username", "_id name");
    return posts;
  } catch (err) {
    throw err;
  }
};

//Implementation of the retrieving the posts of the signed in user only
export const getmyposts = async (userID, response) => {
  try {
    const myposts = await Post.find({ username: userID }).populate(
      "username",
      "_id name"
    );
    return response.json({ myposts });
  } catch (err) {
    throw err;
  }
};

//Services implementation of the like feature for the posts
export const likemyposts = async (request, response) => {
  try {
    const val = await Post.findByIdAndUpdate(
      request.body._id,
      {
        $push: { likes: request.body.user },
      },
      { new: true }
    )
      .populate("likes", "name")
      .then((res) => {
        if (res) {
          return response.json({ res });
        } else {
          console.log("err");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw err;
  }
};

//Services implementation of the unlike feature for the posts
export const unlikemyposts = async (request, response) => {
  try {
    const val = await Post.findByIdAndUpdate(
      request.body._id,
      {
        $pull: { likes: request.body.user },
      },
      {
        new: true,
      }
    )
      .then((res) => {
        if (res) {
          return response.json({ res });
        } else {
          console.log("err");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw err;
  }
};

//Services implementation of the comment on the posts feature of the signed in user
export const commentOnMyPost = async (request, response) => {
  console.log(request.body);
  try {
    const comment = {
      comment_text: request.body.comment_text,
      username: request.body.username,
    };
    const val = await Post.findByIdAndUpdate(
      request.body._id,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.username", "name")
      .then((res) => {
        if (res) {
          return response.json({ res });
        } else {
          console.log("err");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw err;
  }
};

//Services implementation of the reply on comment for the posts feature of the signed in user
export const replyOnMyComment = async (request, response) => {
  console.log(request.body);

  try {
    const reply = {
      reply_text: request.body.reply_text,
      username: request.body.username,
    };
    const val = await Post.findById(request.body._id).populate(
      "comments.replies.username",
      "name"
    );
    console.log(val);
    if (!val) {
      // console.log("Comming here?")
    } else {
      const maincom = val.comments.filter((comment) => {
        if (comment._id.equals(new ObjectId(request.body.commentId))) {
          return comment;
        }
      })[0];
      console.log("Comming here?", maincom);
      maincom.replies.push(reply);
      console.log("Comming here?");
      return await val.save();
    }
  } catch (err) {
    throw err;
  }
};

//Services implementation of the deleting a post
export const delPost = async (request, response) => {
  try {
    const post = await Post.findOne({ _id: request.params.postId }).populate(
      "username",
      "._id"
    );
    if (!post) {
      return response.status(422).json({ error: "Post not found" });
    }

    post
      .deleteOne({ _id: post._id })
      .then((res) => {
        if (res) {
          return response.json("Successfully deleted");
        } else {
          console.log("err");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

//Service function to get a post by post id
export const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("username", "name email")
      .populate("likes", "name")
      .populate("comments.username", "name email")
      .populate("comments.replies.username", "name email");
    return post;
  } catch (error) {
    throw new Error(error);
  }
};
