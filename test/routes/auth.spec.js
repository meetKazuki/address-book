import { should } from 'chai';
import request from 'supertest';
import app from '../../src/app';

should();

const BASE_ROUTE = '/api/v1/auth';

describe('Authentication Routes', () => {
  describe('Signup Route', () => {
    it('should create a new user by posting to /signup route', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/register`)
        .send({
          email: 'desmond@strv.com',
          password: '123456789',
        });

      console.log('response ->', response.body);

      response.status.should.equal(201);
      response.body.status.should.equal('success');
      response.body.should.have.property('data');
      response.body.data.should.have.property('token');
      response.body.data.token.should.be.a('string');
      response.body.data.should.have.property('user');
      response.body.data.user.should.have.all.keys([
        'id',
        'email',
      ]);
    });

    it('should return an error if user is already registered', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/register`)
        .send({
          email: 'desmond@strv.com',
          password: '123456789',
        });

      response.status.should.equal(409);
      response.body.status.should.equal('error');
      response.body.should.have.property('error');
    });
  });

  describe('Login Route', () => {
    it('should post to /api/v1/auth/signin', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/login`)
        .send({
          email: 'desmond@strv.com',
          password: '123456789',
        });

      response.status.should.equal(200);
      response.body.status.should.eql('success');
      response.body.data.should.have.property('token');
      response.body.data.token.should.be.a('string');
      response.body.should.have.property('data');
      response.body.data.user.should.have.property('email');
    });

    it('should throw an error for wrong password', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/login`)
        .send({
          email: 'desmond@strv.com',
          password: '12345678',
        });

      response.status.should.equal(401);
      response.body.status.should.eql('error');
      response.body.error.message.should.equal('email/password is incorrect');
    });

    it('should throw an error for wrong email', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/login`)
        .send({
          email: 'desmond@wrong.com',
          password: '123456789',
        });

      response.status.should.equal(401);
      response.body.status.should.eql('error');
      response.body.error.message.should.equal('email/password is incorrect');
    });
  });
});
