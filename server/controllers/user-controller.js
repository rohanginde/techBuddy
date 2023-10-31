import * as userService from '../services/user-service.js';

//import { req, res } from "express";
import express from 'express';
import {getAllUsers, getUserById, updateUserById, deleteUserById } from '../services/user-service.js';

import jwt from 'jsonwebtoken';
//const jwt = require("jsonwebtoken");

// Controller function to get all users
export const index = async (req, res) => {
  try {

    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to get a single user by ID
export const find = async (req, res) => {
  try {

    const user = await userService.getUserById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Controller function to update a user by ID
export const update = async (req, res) => {
  try {
    const updatedUser = req.body;
    console.log(req.body)
    const user = await userService.updateUserById(req.user._id, updatedUser);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Controller function to delete a user by ID
export const remove = async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
