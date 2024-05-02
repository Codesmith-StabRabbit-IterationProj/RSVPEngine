// server/routes/authRoutes.js
import express from 'express';
const router = express.Router();
import userController from '../controller/userController.js';

console.log('you are inside the authroutes');

// Route for user login
router.post('/login', userController.findUserByUsernameAndPassword, (req, res) => {
  res.status(200).json(res.locals.user);
});

// Route for user signup
router.post('/signup', userController.createUser, (req, res) => {
  // Respond with status 200 and JSON data of the newly created user
  console.log('inside router');
  res.status(200).json(res.locals.signup);
});

export default router;
