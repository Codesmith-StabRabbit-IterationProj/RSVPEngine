import request from 'supertest';
import app from '../../server/src/server';

// server health check test
describe('GET /ping', () => {
  test('It should respond with pong', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('pong');
  });
});

// suite of tests related to events
describe('POST and GET /api/create', () => {
  let eventId;

  const data = {
    username: 'testUser',
    eventName: 'Test Event',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    location: 'Test Location',
    description: 'Test Description',
    attendees: [],
  };

  const attendeeData = {
    name: 'John Doe',
    response: 'Attending',
  };

  // test for creating a new event
  test('It should respond with a new event', async () => {
    // create an object to hold dummy test data
    const response = await request(app).post('/api/create').send(data);
    // verify the respond status is 201
    expect(response.statusCode).toBe(201);
    // verify the response body contains the eventId
    expect(response.body.event).toHaveProperty('eventId');
    // verify that the eventId is defined
    expect(response.body.event.eventId).toBeDefined();

    eventId = response.body.event.eventId;
  });

  test('It should handle errors when creating an event with incomplete data', async () => {
    const response = await request(app).post('/api/create').send({ eventName: 'Incomplete Event' });
    console.log(response.body); // structure of the response body.
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(
      'Error occurred in eventController.createEvent. Check server log for details',
    );
  });

  // test for getting an event by the id
  test('It should get the data for an existing event', async () => {
    const response = await request(app).get(`/api/event/${eventId}`);
    expect(response.statusCode).toBe(200);

    // check for all the properties in the response body
    expect(response.body).toHaveProperty('eventName');
    expect(response.body).toHaveProperty('startTime');
    expect(response.body).toHaveProperty('endTime');
    expect(response.body).toHaveProperty('location');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('attendees');

    // check that each property maches the dummy object above
    expect(response.body.eventName).toBe('Test Event');
    expect(response.body.startTime).toBe(data.startTime);
    expect(response.body.endTime).toBe(data.endTime);
    expect(response.body.location).toBe('Test Location');
    expect(response.body.description).toBe('Test Description');
    expect(response.body.attendees).toEqual([]);
  });

  test('It should add an attendee to an event', async () => {
    const response = await request(app).post(`/api/event/${eventId}`).send(attendeeData);
    expect(response.statusCode).toBe(201);
    expect(response.body.attendees[0].name).toBe(attendeeData.name);
    expect(response.body.attendees[0].response).toBe(attendeeData.response);
  });
});

// Test for 404 Not Found handling
describe('404 Not Found Handler', () => {
  test('It should respond with 404 for non-existent routes', async () => {
    const response = await request(app).get('/route-does-not-exist');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Page not found.');
  });
});
