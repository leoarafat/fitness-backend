import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CartController } from './cart.controller';

const router = Router();
router.get(
  '/cart-lists',
  auth(ENUM_USER_ROLE.USER),
  CartController.myCartLists,
);
router.post(
  '/add-to-cart/:id',
  auth(ENUM_USER_ROLE.USER),
  CartController.addToCart,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.USER),
  CartController.deleteCart,
);

export const CartRoutes = router;
