const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();


const {expect} = chai;

chai.use(chaiHTTP);


it('gets the test endpoint', (done) => {
    chai.request(app).get('/test').end((err, res) => {
      expect (res).to.have.status(200);
      expect (res.body.message).to.equal('test works')
      done()
    })

  })


describe('Inventory API suite', () => {
    it('checks successful response', (done) => {
        chai.request(app).get('/api/users').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.count).to.equal(54);
        done();
        })
        
})
})