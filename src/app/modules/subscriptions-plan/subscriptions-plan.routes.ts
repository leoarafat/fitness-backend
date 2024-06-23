import express from 'express';
import auth from '../../middlewares/auth';
import { SubscriptionsPlanController } from './subscriptions-plan.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { SubscriptionPlanValidation } from './subplan.validation';
const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(SubscriptionPlanValidation.post),
  SubscriptionsPlanController.adSubscriptions,
);

router.post(
  '/add-item',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscriptionsPlanController.adSubscriptionsItem,
);
router.get(
  '/all',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  SubscriptionsPlanController.getSubscriptions,
);
router.delete(
  '/delete-item/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscriptionsPlanController.deleteSubscriptionsTitle,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscriptionsPlanController.deleteSubscriptions,
);
router.patch(
  '/update/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(SubscriptionPlanValidation.update),
  SubscriptionsPlanController.updateSubscriptionsTitle,
);
router.patch(
  '/update-item/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SubscriptionsPlanController.updateSubscriptionsItem,
);

export const SubscriptionPlanRoutes = router;
