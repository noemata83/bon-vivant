const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const logger = require('../shared/logger');

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch(e) {
    console.log(e);
    return null
  }
}

const getAllUsers = async () => {
  const users = await User.find();
  return users;
}

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
}


const signUp = async (username, password, email) => {
  const user = new User({ username, password, email });
  try {
    await user.save();
    const payload = { username: user.username, id: user.id };
    const options = { expiresIn: '3d' };
    const secret = config.JWT_SECRET;
    const token = jwt.sign(payload, secret, options);
    return {
      ...user,
      token
    };
  } catch(e) {
    console.log(e);
  }
}

const login = async ( username, password ) => {
  const user = await User.findOne({ username: username });
  if (user) {
    const passwordIsValid = await user.isValidPassword(password);
    if (passwordIsValid) {
      const payload = { username: user.username, id: user.id };
      const options = { expiresIn: '3d' };
      const secret = config.JWT_SECRET;
      const token = jwt.sign(payload, secret, options);
      return {
        token
      };
    } else {
      return 'error';
    }
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  deleteUser,
  signUp,
  login
}