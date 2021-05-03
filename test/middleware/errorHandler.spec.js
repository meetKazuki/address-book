import { should } from 'chai';
import ApplicationError from '../../src/helpers/error';
import errorHandler from '../../src/middleware/errorHandler';

should();

describe('Error Handler Unit Tests', () => {
  const error = new Error('Error');
  let request, response, next, nextCall = 0;

  beforeEach(() => {
    request = {};
    response = {
      status(code) {
        response.status = code;
        return response;
      },
      json(data) {
        response.body = data;
      },
    };
    next = () => { nextCall += 1; };
  });

  it('should return error status 500', async () => {
    errorHandler(error, request, response, next);
    response.status.should.equal(500);
  });

  it('should not return stack trace in production environment', async () => {
    process.env.NODE_ENV = 'production';
    error.status = 403;

    errorHandler(error, request, response, next);

    response.status.should.equal(403);
    response.body.status.should.equal('error');
    response.body.error.message.should.equal('Error');
    response.body.error.should.not.have.property('trace');
  });

  it('should return error with stack trace in development environment', async () => {
    process.env.NODE_ENV = 'development';
    error.status = 403;

    errorHandler(error, request, response, next);

    response.status.should.equal(403);
    response.body.status.should.equal('error');
    response.body.error.message.should.equal('Error');
    response.body.error.should.have.property('trace');
  });

  it('should call next when response headers have already been sent', async () => {
    response.headersSent = true;

    errorHandler(error, request, response, next);

    nextCall.should.equal(1);
    response.should.not.have.property('body');
  });

  it('should have an errors field', async () => {
    const applicationError = new ApplicationError(400, 'Invalid input', ['invalid input']);

    errorHandler(applicationError, request, response, next);

    response.status.should.eql(400);
    response.body.status.should.eql('error');
    response.body.error.errors.should.not.be.empty;
  });
});
