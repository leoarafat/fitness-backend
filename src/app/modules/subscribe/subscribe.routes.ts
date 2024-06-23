import express from 'express';
import { SubscribeController } from './subscribe.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { SubscribeValidation } from './subscribe.validation';
const router = express.Router();

router.post(
  '/send',
  validateRequest(SubscribeValidation.post),
  SubscribeController.insertIntoDB,
);
router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscribeController.getSubscribeData,
);

export const subscribeRoutes = router;
