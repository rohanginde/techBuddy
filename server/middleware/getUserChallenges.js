import mongoose from "mongoose";
import User from "../models/user.js";
import Challenges from "../models/challenges.js";

// Middleware function to check if the user is registered for the challenge or not
export const isUserRegistered = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user; // Assuming you have a user object attached to the request
  
    const challenge = await Challenges.findById(id);
    if (!challenge.registeredUsers.includes(_id)) {
      return res.status(403).json({ error: 'User not registered for the challenge' });
    }
    next();
}
  