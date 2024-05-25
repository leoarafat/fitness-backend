import express from 'express';
import { FeedbackController } from './feedback.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();
router.post(
  '/send',
  validateRequest(FeedbackValidation.post),
  FeedbackController.sendFeedBack,
);
router.get('/all', auth(ENUM_USER_ROLE.ADMIN), FeedbackController.getFeedback);
router.post('/reply/:id', FeedbackController.addReplyToFeedback);
export const FeedbackRoutes = router;
