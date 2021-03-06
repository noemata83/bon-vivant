const User = require("../models/User")
const Spec = require("../models/Spec")
const Ingredient = require("../models/Ingredient").model
const jwt = require("jsonwebtoken")
const config = require("../config/keys")

const isDuplicate = (arr, id) => {
  console.log(arr)
  const found = arr.findIndex(item => item == id)
  return found != -1
}

const setTokenCookie = (res, token) => {
  res.cookie("appToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
}

const getUserById = async id => {
  try {
    const user = await User.findById(id)
    return user
  } catch (e) {
    throw new Error("User not found.")
  }
}

const getAllUsers = async () => {
  const users = await User.find()
  return users
}

const deleteUser = async id => {
  return await User.findByIdAndDelete(id)
}

const addIngredientToShelf = async (userId, ingredientId) => {
  const user = await User.findById(userId)
  if (isDuplicate(user.shelf, ingredientId))
    throw new Error("Ingredient is already on your shelf.")
  user.shelf.push(ingredientId)
  try {
    user.save()
    return user
  } catch (e) {
    throw new Error("Error updating ingredient shelf.")
  }
}

const removeIngredientFromShelf = async (userId, ingredientId) => {
  const user = await User.findById(userId)
  user.shelf = user.shelf.filter(ingredient => ingredient.id !== ingredientId)
  try {
    user.save()
    return user
  } catch (e) {
    throw new Error("Error updating ingredient shelf.")
  }
}

const addSpecToBook = async (userId, specId) => {
  const user = await User.findById(userId)
  if (isDuplicate(user.book, specId)) {
    throw new Error("Spec is already in your cocktail book.")
  }
  user.book.push(specId)
  console.log(user)
  try {
    user.save()
    return user
  } catch (e) {
    throw new Error("Error updating cocktail book.")
  }
}

const signUp = async (username, password, email, res) => {
  const user = new User({ username, password, email, shelf: [], book: [] })
  try {
    await user.save()
    const payload = { username: user.username, id: user.id }
    const options = { expiresIn: "7d" }
    const secret = config.JWT_SECRET
    const token = jwt.sign(payload, secret, options)
    setTokenCookie(res, token)
    return {
      ...user,
      token
    }
  } catch (e) {
    console.log(e)
  }
}

const login = async (username, password, res) => {
  const user = await User.findOne({ username: username })
  if (user) {
    const passwordIsValid = await user.isValidPassword(password)
    if (passwordIsValid) {
      const payload = { username: user.username, id: user.id }
      const options = { expiresIn: "7d" }
      const secret = config.JWT_SECRET
      const token = jwt.sign(payload, secret, options)
      setTokenCookie(res, token)
      return {
        token
      }
    } else {
      throw new Error("Invalid password.")
    }
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  deleteUser,
  signUp,
  login,
  addIngredientToShelf,
  addSpecToBook
}
