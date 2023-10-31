import Submission from "../models/submissions.js";

// Get all submissions by author id

// export const getSubmissionsByAuthorId = async (authorId) => {

//   try {

//     const submissions = await Submission.find({ author: authorId }).populate('submittedBy author');

//     return submissions;

//   } catch (err) {

//     console.error(err);

//     throw new Error('Error getting submissions by author id');

//   }

// };

// // Get all submissions for challenge id

// export const getSubmissionsForChallengeId = async (challengeId) => {

//   try {

//     const submissions = await Submission.find({ challenge: challengeId }).populate('submittedBy author');

//     return submissions;

//   } catch (err) {

//     console.error(err);

//     throw new Error('Error getting submissions for challenge id');

//   }

// };




// Service function to create a new submission

export const createSubmission = async (submissionData) => {
  try {
    const submission = new Submission(submissionData);

    const newSubmission = await submission.save();

    return newSubmission;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service function to get all submissions for a challenge

export const getSubmissionsByChallengeId = async (challengeId) => {
  console.log("here",challengeId)
  try {
    const submissions = await Submission.find({ challengeId }).populate(
      "submittedBy" 
      
    );

    return submissions;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service function to get all submissions by a user

export const getSubmissionsByUsername = async (username) => {
  try {
    const submissions = await Submission.find({ submittedBy: username }).populate(
      "challengeId",

      "description"
    );

    return submissions;
  } catch (error) {
    throw new Error(error.message);
  }
};
