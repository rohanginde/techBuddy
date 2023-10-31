import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  submittedBy:{
    type: String,

    required: true,
  },
  // author: {

  //     type: mongoose.Schema.Types.ObjectId,

  //     ref: "User",

  //     required: true

  // },

  fileMetaData: {
    type: String,

    required: true,
  },

  challengeId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Challenges",

    required: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
