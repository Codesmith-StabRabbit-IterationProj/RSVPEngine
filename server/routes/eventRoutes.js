import express from 'express';
const router = express.Router();
import eventController from '../controller/eventController.js';

// all requests are routed via this file (from server.js)
// routing all requests at respective endpoints to relevant middleware

// router.post('/signup', (req, res) => {
//   console.log("I'm in the signup route");
//   res.status(200).send('Signup route');
// });

router.get('/event/:eventId', eventController.getEvent, (req, res) =>
  res.status(200).send(res.locals.requestedEvent),
);

router.post('/event/:eventId', eventController.postEvent, (req, res) =>
  res.status(201).send(res.locals.requestedEvent),
);

router.post(
  '/create',
  eventController.createEvent,
  (req, res) => res.status(201).send(res.locals.eventId), // need to return unique URL link from clicking 'create' button
);

export default router;
