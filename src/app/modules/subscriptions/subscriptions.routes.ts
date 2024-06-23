import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SubscriptionController } from './subscriptions.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { SubscriptionValidation } from './subscription.validations';

const router = Router();

router.post(
  '/upgrade-plan',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(SubscriptionValidation.post),
  SubscriptionController.upgradeSubscription,
);
router.get(
  '/subscribers',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscriptionController.AllSubscriber,
);
router.get(
  '/my-plan',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscriptionController.mySubscription,
);
export const SubscriptionRoutes = router;
