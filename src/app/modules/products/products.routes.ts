import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ProductController } from './products.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = Router();
router.post(
  '/add-product',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  ProductController.createProduct,
);
router.get('/products', ProductController.allProducts);
router.get('/:id', ProductController.singleProduct);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.deleteProduct,
);
router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  ProductController.updateProduct,
);

export const ProductRoutes = router;
