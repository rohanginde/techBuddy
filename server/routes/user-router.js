import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
// import User from "../models/user.js";
// const User = mongoose.model("User");
// const requireLogin = require('../middleware/requireLogin')
import * as userController from "../controllers/user-controller.js";
import requireLogin from "../middleware/requireLogin.js"

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MONGOURI, { JWT_SECRET } from '../../keys.mjs';


router.route("/")
    // .post(userController.post)
    .get(requireLogin,userController.index);


// router.route("/:id")
//     .get(requireLogin,userController.find)
//     .put(requireLogin,userController.update)
//     .delete(requireLogin,userController.remove);



router.route("/get")
    .get(requireLogin,userController.find);

router.route("/update") 
    .put(requireLogin,userController.update);

router.route("/delete") 
    .delete(requireLogin,userController.remove);    


// router.route("/").put(userController.index);
// router.route('/myuser').put(requireLogin,userController.find);
// router.route('/updateusers').put(requireLogin,userController.update);
// router.route('/deleteusers').put(requireLogin,userController.remove);


export default router;