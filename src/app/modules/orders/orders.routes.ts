import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { OrderController } from './orders.controller';

const router = Router();
router.post(
  '/place-order',
  auth(ENUM_USER_ROLE.USER),
  OrderController.makeOrder,
);
router.get(
  '/order-history',
  auth(ENUM_USER_ROLE.USER),
  OrderController.myOrders,
);
router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  OrderController.getAllOrders,
);

router.get(
  '/single/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  OrderController.getSingle,
);
router.patch(
  '/update/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  OrderController.updateOrder,
);
export const OrderRoutes = router;
