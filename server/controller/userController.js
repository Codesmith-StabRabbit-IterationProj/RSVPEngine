// server/controller/userController.js
import User from '../model/userModel.js'

const userController = {}

// Define a controller function to find a user by username and password
userController.findUserByUsernameAndPassword = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username, password })
    if (!user) {
      res.locals.login = false
      return res.status(404).json(res.locals.login)
    } else {
      res.locals.login = true
      return res.status(200).json(res.locals.login)
    }
  } catch (err) {
    return next({
      log: `userController.findUserByUsernameAndPassword: ERROR: ${err}`,
      status: 401,
      message: 'Error occurred in userController.findUserByUsernameAndPassword. Check server log for details'
    })
  }
}

// Define a controller function to create a new user
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      res.locals.signup = false
      return res.status(400).json({ error: 'Username already exists' })
    }
    //  If username does not exist, create a new user with the provided username and password
    const newUser = await User.create({ username, password })
    res.locals.signup = true
    return res.status(201).json(newUser)
  } catch (err) {
    return next({
      log: `userController.createUser: ERROR: ${err}`,
      status: 500,
      message: 'Error occurred while creating user'
    })
  }
}

export default userController
