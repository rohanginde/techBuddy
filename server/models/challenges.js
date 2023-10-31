import mongoose from "mongoose";
import { SchemaTypes } from "mongoose";

const userChallenges = new mongoose.Schema({
  id: {
    type: SchemaTypes.ObjectId,
    //required: true
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    // default: []
  },
  tags: [String],
  registeredUsers:  [String],
  submissions: {
    type: Number,
  },
  regTime:{type:String},
  regDate:{type:String},
  subTime:{type:String},
  subDate:{type:String},
  author:{
    type:String
  }
});

export default mongoose.model("Challenges", userChallenges);
