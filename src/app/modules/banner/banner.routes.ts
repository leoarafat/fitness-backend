import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BannerController } from './banner.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = Router();
router.get('/', BannerController.getBanner);
router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  BannerController.addBanner,
);
export const BannerRoutes = router;
