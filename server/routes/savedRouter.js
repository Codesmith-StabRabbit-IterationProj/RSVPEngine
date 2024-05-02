import express from 'express';
const router = express.Router();
import Event from '../model/eventModel.js'

router.get('/', async (req, res, next) => {
  try {
    const { username } = req.params;
    const savedEvents = await Event.findAll({ username: username });
    res.locals.savedEvents = savedEvents;
  } catch (err) {
    return next({
      log: `savedRouter.get: ERROR: ${err}`,
      status: 400,
      message: 'Error occurred in savedRouter.get. Check server log for details',
    });
  }
});

export default router;
