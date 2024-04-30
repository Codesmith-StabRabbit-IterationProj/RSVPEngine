// Change the require statements to import statements
import request from 'supertest';
import app from '../../server/src/server'; // Adjust the path as necessary and make sure the server exports the app

describe('GET /ping', () => {
  test('It should respond with pong', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('pong');
  });
});
