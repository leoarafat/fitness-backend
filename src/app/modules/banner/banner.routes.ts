import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BannerController } from './banner.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = Router();
router.get('/', BannerController.getBanner);
router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  BannerController.addBanner,
);
router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  BannerController.updateBanner,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BannerController.deleteBanner,
);
export const BannerRoutes = router;
