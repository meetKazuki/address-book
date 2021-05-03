import { Router } from 'express';
import asyncWrapper from '../middleware/asyncWrapper';
import authMiddleware from '../middleware/auth';
import contactController from '../controllers/contact.controller';
import validationSchema from '../validators';
import validator from '../middleware/validator';

const router = Router();

const { verifyToken } = authMiddleware;
const { createContactSchema } = validationSchema;
const { createContact } = contactController;

router.post(
  '/',
  verifyToken,
  validator(createContactSchema),
  asyncWrapper(createContact),
);

export default router;
