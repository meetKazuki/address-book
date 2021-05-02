import { should } from 'chai';
import model from '../../src/models';

should();

const { user } = model;

describe('Unit Test for User Model', () => {
  beforeEach(async () => {
    await user.destroy({ where: {} });
    await user.create({
      email: 'user@email.com',
      password: '123456789',
    });
  });
  after(async () => { await user.destroy({ where: {} }); });
});
