import express from 'express';
const router = express.Router();
import Event from '../model/eventModel.js';

router.get('/:username', async (req, res, next) => {
  console.log('req.params', req.params);
  try {
    console.log('you are in saved Router ');
    const { username } = req.params;
    const savedEvents = await Event.find({ username: username });
    res.locals.savedEvents = savedEvents;
    next();
  } catch (err) {
    return next({
      log: `savedRouter.get: ERROR: ${err}`,
      status: 400,
      message: 'Error occurred in savedRouter.get. Check server log for details',
    });
  }
});

export default router;
