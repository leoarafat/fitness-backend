import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ClassController } from './class.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = Router();
router.post(
  '/add-class',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  ClassController.createClass,
);

export const ClassRoutes = router;
