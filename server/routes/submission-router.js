import express from "express";
const router = express.Router();
import mongoose from "mongoose";
// import User from "../models/user.js";
// const User = mongoose.model("User");
// const requireLogin = require('../middleware/requireLogin')
import * as submissionController from "../controllers/submission-controller.js";
import requireLogin from "../middleware/requireLogin.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MONGOURI, { JWT_SECRET } from "../../keys.mjs";

router
  .route("/mysubmissions/:username")
  // .post(userController.post)
  .get(requireLogin, submissionController.getMySubmissions);

router.route("/challengeId/:id").get(requireLogin, submissionController.find);

router
  .route("/:challengeId/submit")
  .post(requireLogin, submissionController.submitChallenge);
//mysubmissions is pending

export default router;
