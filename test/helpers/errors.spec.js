import chai, { should } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import ApplicationError from '../../src/helpers/error';

chai.use(chaiAsPromised);
chai.use(sinonChai);

should();

describe('ApplicationError Unit Tests', () => {
  it('should set status as 500 if no error code is specified', () => {
    const error = new ApplicationError();
    error.should.have.property('status');
    error.status.should.equal(500);
  });

  it('should set status to to the code specified', () => {
    const error = new ApplicationError(404);
    error.should.have.property('status');
    error.status.should.equal(404);
  });

  it('should set error message', () => {
    const error = new ApplicationError(404, 'not found');
    error.should.have.property('message');
    error.message.should.equal('not found');
  });
});
