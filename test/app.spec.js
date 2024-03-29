import { config } from 'dotenv';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

config();

describe('Test App Setup', () => {
  it('app should be a function', () => {
    expect(app).to.be.a('function');
  });

  it('should return success response when index route is accessed', (done) => {
    request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).equal('welcome to "Address Book API v1"');
        done(err);
      });
  });

  specify('an error when an invalid route is accessed', (done) => {
    request(app)
      .get('/404')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('resource not found');
        done(err);
      });
  });
});
