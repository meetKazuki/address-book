import { check, body } from 'express-validator';

export default {
  createUserSchema: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('email address is required')
      .isEmail()
      .withMessage('enter a valid email address')
      .normalizeEmail({
        gmail_remove_dots: false,
      }),

    check('password')
      .not()
      .isEmpty()
      .withMessage('password is required'),
  ],

  signinUserSchema: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('email is required'),

    check('password')
      .not()
      .isEmpty()
      .withMessage('password is required'),
  ],

  createContactSchema: [
    check('first_name')
      .if(body('last_name').isEmpty())
      .not()
      .isEmpty()
      .withMessage('first_name is required'),

    check('last_name')
      .if(body('first_name').isEmpty())
      .not()
      .isEmpty()
      .withMessage('last_name is required'),

    check('phone')
      .not()
      .isEmpty()
      .withMessage('phone is required'),
  ],
};
