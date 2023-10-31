import * as submissionService from "../services/submission-service.js";

// Get all submissions by author id

export const index = async (req, res) => {
  const authorId = req.params.username;

  try {
    const submissions = await submissionService.getSubmissionsByAuthorId(
      authorId
    );

    res.json(submissions);
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Error getting submissions by author id" });
  }
};

// // Get all submissions for challenge id

// export const find = async (req, res) => {

//   const challengeId = req.params.challengeId;

//   try {

//     const submissions = await submissionService.getSubmissionsForChallengeId(challengeId);

//     res.json(submissions);

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({ error: 'Error getting submissions for challenge id' });

//   }

// };

// Controller function to handle submission of a challenge

export const submitChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;

    const { fileMetaData } = req.body;

    const { submittedBy } = req.body;

    // Create a new submission object

    const submissionData = {
      challengeId,

      fileMetaData,

      submittedBy,

    };
    console.log('sd',submissionData)

    // Create the submission

    const newSubmission = await submissionService.createSubmission(
      submissionData
    );

    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all submissions for a challenge

export const find = async (req, res) => {
  try {
    const challengeId = req.params.id;

    // Get all submissions for the challenge
console.log(req.body._id)
    const submissions = await submissionService.getSubmissionsByChallengeId(
      challengeId
    );

    res.json(submissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getMySubmissions = async (req,res)=>{
  try {
    const username = req.params.username;

    // Get all submissions by user

    const submissions = await submissionService.getSubmissionsByUsername(
      username
    );

    res.json(submissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}
