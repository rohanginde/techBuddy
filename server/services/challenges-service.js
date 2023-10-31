import Challenges from "../models/challenges.js";

// Get all challenges
export const getAllChallenges = async () => {
  try {
    const challenges = await Challenges.find({});
    return challenges;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new challenge
export const createChallenge = async (challengeData) => {
  try {
    const challenge = new Challenges(challengeData);
    const newChallenge = await challenge.save();
    return newChallenge;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update an existing challenge
export const updateChallenge = async (id, updatedChallenge) => {
  try {
    const challenge = await Challenges.findByIdAndUpdate(
      id,
      updatedChallenge,
      {
        new: true,
      }
    );
    return challenge;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a challenge
export const deleteChallenge = async (id) => {
  try {
    await Challenges.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a single challenge
export const getChallengeById = async (id) => {
  try {
    const challenge = await Challenges.findById(id);
    return challenge;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Register user for a challenge
// export const registerForChallenge = async (challengeId, userId) => {
//   try {
//     const challenge = await Challenges.findById(challengeId);
//     if (!challenge) {
//       throw new Error("Challenge not found");
//     }
//     // Check if user is already registered for the challenge
//     if (challenge.registeredBy.includes(userId)) {
//       throw new Error("User already registered for the challenge");
//     }
//     challenge.registeredBy.push(userId);
//     const updatedChallenge = await challenge.save();
//     return updatedChallenge;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };


export const registerUserForChallenge = async (challengeId, userId) => {
    try {
      const challenge = await Challenges.findById(challengeId);
  
      if (!challenge) {
        throw new Error("Challenge not found");
      }
  
      // Check if the user is already registered for the challenge
      if (challenge.registeredUsers.includes(userId)) {
        throw new Error("User is already registered for the challenge");
      }
  
      // Add the user to the list of registered users
      challenge.registeredUsers.push(userId);
  
      // Save the updated challenge
      await challenge.save();
  
      return challenge;
    } catch (error) {
      throw new Error(error.message);
    }
};
  


// Function to get all challenges with registered users
// Service function to get challenges registered by a user
export const getChallengesRegisteredByUser = async (userId) => {
    try {
      const challenges = await Challenges.find({ registeredUsers: userId });
      return challenges;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
