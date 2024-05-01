import request from 'supertest';
import app from '../../server/src/server'; // import server file

// health check test for server - make sure it responds to a basic specified route
describe('GET /ping', () => {
  test('It should respond with pong', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('pong');
  });
});

// suite of tests related to events, route is /api/create
describe('POST /api/create', () => {
  let eventId;

  const data = {
    eventName: 'Test Event',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    location: 'Test Location',
    description: 'Test Description',
    attendees: [],
  };

  test('It should respond with a new event', async () => {
    // create an object to hold dummy test data
    const response = await request(app).post('/api/create').send(data);
    // verify the respond status is 201
    expect(response.statusCode).toBe(201);
    // verify the respond body contains the eventId
    expect(response.body.event).toHaveProperty('eventId');
    // verify that the eventId is defined
    expect(response.body.event.eventId).toBeDefined();

    eventId = response.body.event.eventId;
  });

  test('GET /api/event/:eventId', async () => {
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
});

// describe('GET /api/event/:eventId', () =>)
// test for creating a new event

// test for getting an event by the id

// test for adding an attendee to an event

// test the 404 handler
