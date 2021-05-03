import { Router } from 'express';
import asyncWrapper from '../middleware/asyncWrapper';
import authController from '../controllers/auth.controller';
import validationSchemas from '../validators';
import validator from '../middleware/validator';

const router = Router();

const { createUser, signinUser } = authController;
const { createUserSchema, signinUserSchema } = validationSchemas;

router.post(
  '/register',
  validator(createUserSchema),
  asyncWrapper(createUser),
);

router.post(
  '/login',
  validator(signinUserSchema),
  asyncWrapper(signinUser),
);

export default router;
