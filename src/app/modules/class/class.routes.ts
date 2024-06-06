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
router.get(
  '/by-series/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ClassController.getClassBySeries,
);

router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ClassController.deleteClass,
);
router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  ClassController.updateClass,
);

export const ClassRoutes = router;
