import User from '../models/user.js';

// Service function to get all users
export const getAllUsers = async () => {
  try {
    const users = await User.find().select('name email');
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Service function to get a single user by ID
export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Service function to update a user by ID
export const updateUserById = async (id, updatedUser) => {
  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Service function to delete a user by ID
export const deleteUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
