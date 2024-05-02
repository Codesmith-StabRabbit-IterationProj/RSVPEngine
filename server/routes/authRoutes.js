// server/routes/authRoutes.js
import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'

// Route for user logi
router.post('/login', userController.findUserByUsernameAndPassword, (req, res) => {
  res.status(200).json(res.locals.user)
})

// Route for user signup
router.post('/signup', userController.createUser, (req, res) => {
  // Respond with status 200 and JSON data of the newly created user
  res.status(200).json(res.locals.newUser)
})

export default router
