import { Router } from 'express';
import authRoute from './auth.route';
import contactRoute from './contact.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/contacts', contactRoute);

export default router;
