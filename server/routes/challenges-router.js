import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
// import User from "../models/user.js";
// const User = mongoose.model("User");
// const requireLogin = require('../middleware/requireLogin')
import * as challengesController from "../controllers/challenges-controller.js";
import requireLogin from "../middleware/requireLogin.js";
import { isUserRegistered } from "../middleware/getUserChallenges.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MONGOURI, { JWT_SECRET } from '../../keys.mjs';


// router.route("/")
//     .post(challengesController.post)
//     .get(challengesController.index);


// router.route("/:id")
//     .get(challengesController.find)
//     .put(challengesController.update)
//     .delete(challengesController.remove);

// router.route("/register")
//     .post(challengesController.registerUserForChallenge);    


//working
router.route("/getall")
    .get(requireLogin,challengesController.index);    

//working
router.route("/publish")
    .post(requireLogin,challengesController.post); 


// router.route("/get")
//     .get(requireLogin,challengesController.find);

// router.route("/:id")    
//     .put(requireLogin,challengesController.update);

// router.route("/delete")       
//     .delete(requireLogin,challengesController.remove);


//working
router.route("/register")
    .post(requireLogin,challengesController.registerUserForChallenge);      


// Endpoint to fetch challenges registered by the user
router.route("/registered")
    .get(requireLogin, challengesController.getChallengesRegisteredByUser);


// Endpoint to fetch a single challenge
router.route("/challenges/:id")
    .get(requireLogin, challengesController.find);



// router.route("/:challengeId/submit")
//     .post(requireLogin, submissionController.submitChallenge);
  


export default router;