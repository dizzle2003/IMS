const server = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');
const request = supertest(server);


describe('GET /test', () => {
  it('Should return a JSON object with message', async() => {
    const response = await request.get('/test');
    expect(response.statusCode).to.equal(200)
    expect(response.body.message).to.equal('test works');
    expect(response.body).to.not.equal(null);
  })
});

