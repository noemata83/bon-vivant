const User = require('../models/User');

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch(e) {
    console.log(e);
    return null
  }
}

module.exports = {
  getUserById
}