import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ReviewController } from './reviews.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewValidation } from './reviews.validation';
const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.post),
  ReviewController.addReview,
);
router.get(
  '/all',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ReviewController.getReviews,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
