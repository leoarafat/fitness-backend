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
router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ClassController.allClasses,
);
router.get(
  '/single/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ClassController.singleClass,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ClassController.deleteClass,
);

export const ClassRoutes = router;
