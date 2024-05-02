import Event from '../model/eventModel.js'; // import eventSchema from eventModel

// add request/methods to obj 'eventController'
const eventController = {};

// purpose: allows user to create an event and share URL link for others to RSVP
eventController.createEvent = async (req, res, next) => {
  try {
    // console.log(req.body); // checking the request body

    // see eventMode.js for Event schema (properties and required fields)
    const newEvent = await Event.create({
      username: req.body.username,
      eventName: req.body.eventName,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      description: req.body.description,
      attendees: req.body.attendeesArray,
    });
    // console.log(newEvent);

    // MongoDB will set unique id to newly created event (_id), which deconstruct below and label (eventId)
    const { _id: eventId } = newEvent;

    // serve the eventId to front-end as an Object
    res.locals.eventId = { event: { eventId } };

    return next();
  } catch (err) {
    return next({
      log: `eventController.createEvent: ERROR: ${err}`,
      status: 400,
      message: 'Error occurred in eventController.createEvent. Check server log for details',
    });
  }
};

// purpose: clicking/entering event URL makes the following GET request
eventController.getEvent = async (req, res, next) => {
  // deconstruct the eventId from request parameters
  const { eventId } = req.params;
  console.log('rp', req.params);
  console.log('EventId', eventId);

  // use the eventId to query the database (to find the event)
  // expect response to include available data associated with eventId
  try {
    const requestedEvent = await Event.findOne({ _id: eventId });
    // console.log('requested Event', requestedEvent);

    res.locals.requestedEvent = requestedEvent;
    // console.log('res.locals', res.locals.requestedEvent);

    return next();
  } catch (err) {
    return next({
      log: `eventController.getEvent: ERROR: ${err}`,
      status: 400,
      message: 'Error occurred in eventController.getEvent. Check server log for details',
    });
  }
};

// purpose of postEvent middleware: create a new attendee's response and add the response to array
eventController.postEvent = async (req, res, next) => {
  // deconstruct unique eventId from req param
  const { eventId } = req.params;

  // deconstruct name and response from req body so we can update/push to attendees (see below)
  const { name, response } = req.body;

  try {
    // find specific event by id and update attendees property (see file eventModel.js for attendeeSchema)
    const requestedEvent = await Event.findOneAndUpdate(
      { _id: eventId },
      { $push: { attendees: { name, response } } },
      { new: true }, // this option (true) returns document after update is applied
    );
    // console.log('requested Event', requestedEvent);

    res.locals.requestedEvent = requestedEvent;
    // console.log('res.locals', res.locals.requestedEvent);

    return next();
  } catch (err) {
    return next({
      log: `eventController.postEvent: ERROR: ${err}`,
      status: 400,
      message: 'Error occurred in eventController.postEvent. Check server log for details',
    });
  }
};

export default eventController;
