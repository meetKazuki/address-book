import chai, { should } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import asyncWrapper from '../../src/middleware/asyncWrapper';

chai.use(sinonChai);
should();

describe('AsyncWrapper Unit Tests', () => {
  const request = {};

  it('should catch all errors', () => {
    const response = {
      status() {},
      json() {},
    };
    const wrapFn = sinon.stub().throws();
    const next = sinon.spy();
    const wrappedFunction = asyncWrapper(wrapFn);

    wrappedFunction(request, response, next);

    next.should.be.calledOnce;
  });
});
