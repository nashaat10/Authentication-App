import supertest from 'supertest';
import app from '../index';

// create a request object that can be used in all tests
const request = supertest(app);

describe('test basic endpoint server', () => {
  it('Get the / endpoint', async () => {
    const response = await request.get('/');
    console.log(response.status);
  });
});
