import express from 'express';
import { FeedbackController } from './feedback.controller';

const router = express.Router();
router.post(
  '/send',

  FeedbackController.sendFeedBack,
);
router.get(
  '/all',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FeedbackController.getFeedback,
);
export const FeedbackRoutes = router;
