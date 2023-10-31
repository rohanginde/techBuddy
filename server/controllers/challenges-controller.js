import * as challengesService from "../services/challenges-service.js";

// Get all challenges
export const index = async (req, res) => {
  try {
    const challenges = await challengesService.getAllChallenges();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new challenge
export const post = async (req, res) => {
  try {
    const newChallenge = await challengesService.createChallenge(req.body);
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing challenge
export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChallenge = await challengesService.updateChallenge(
      id,
      req.body
    );
    res.status(200).json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a challenge
export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await challengesService.deleteChallenge(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single challenge
export const find = async (req, res) => {
  const { id } = req.params;
  //const { id } = req.user._id;
  try {
    const challenge = await challengesService.getChallengeById(id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// // Register user for a challenge
// export const register = async (req, res) => {
//   const { challengeId, userId } = req.body;
//   try {
//     const updatedChallenge = await challengesService.registerForChallenge(
//       challengeId,
//       userId
//     );
//     res.status(200).json(updatedChallenge);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//import * as challengeService from "../services/challenges.service";

// Controller function to register a user for a challenge
export const registerUserForChallenge = async (req, res) => {
  const { challengeId, username } = req.body;

  try {
    const challenge = await challengesService.registerUserForChallenge(
      challengeId,
      username
    );

    res.status(200).json({
      message: "User registered for the challenge successfully",
      challenge,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all challenges with registered users
export const getChallengesWithRegisteredUsers = async (req, res) => {
  try {
    const challenges = await challengesService.getChallengesWithRegisteredUsers();

    res.status(200).json({ challenges });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Endpoint to fetch challenges registered by the user
// export const getChallengesRegisteredByUser = async (req, res) => {
//     const { _id } = req.user; // Assuming you have a user object attached to the request
  
//     try {
//       const challenges = await challengesService.find({ registeredUsers: _id });
//       res.status(200).json(challenges);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
  

// Endpoint to fetch challenges registered by the user
// export const getChallengesRegisteredByUser = async (req, res) => {
//     try {
//       const challenges = await UserChallenges.find({
//         registeredUsers: req.user._id, // Filter challenges by the user's ObjectId
//       });
//       res.status(200).json({ challenges });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
// };
  


// Controller function to get challenges registered by the user
export const getChallengesRegisteredByUser = async (req, res) => {
    try {
      const challenges = await challengesService.getChallengesRegisteredByUser(req.user._id);
      res.status(200).json(challenges);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  