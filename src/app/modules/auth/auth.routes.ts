import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
import { UserController } from '../user/user.controller';
import { AdminController } from '../admin/admin.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminValidation } from '../admin/admin.validation';
import { UserValidation } from '../user/user.validations';
import { AuthValidation } from './auth.validations';

const router = express.Router();
//*User
router.post(
  '/register',
  validateRequest(UserValidation.create),
  UserController.registrationUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  UserController.login,
);
router.post('/refresh-token', UserController.refreshToken);
router.get(
  '/admin/users',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/role-base',
  auth(ENUM_USER_ROLE.USER),
  UserController.userBaseOnGender,
);
router.patch(
  '/change-password',
  auth(ENUM_USER_ROLE.USER),
  UserController.changePassword,
);
router.post('/forgot-password', UserController.forgotPass);
router.post('/reset-password', UserController.resetPassword);

//*IDS Work
router.get(
  '/profile/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser,
);
router.patch(
  '/edit-profile/:id',
  auth(ENUM_USER_ROLE.USER),
  uploadFile(),
  UserController.updateProfile,
);

//* Admin Authentication Start
router.post(
  '/admin/register',
  validateRequest(AdminValidation.create),
  AdminController.registrationUser,
);
router.post(
  '/admin/login',
  validateRequest(AuthValidation.loginZodSchema),
  AdminController.login,
);
router.post('/admin/refresh-token', AdminController.refreshToken);
router.post('/admin/forgot-password', AdminController.forgotPass);
router.post('/admin/reset-password', AdminController.resetPassword);
router.patch(
  '/admin/change-password',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.changePassword,
);
router.post(
  '/admin/add-admin',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.create),
  AdminController.registrationUser,
);
//* Admin Authentication End

router.get(
  '/admin/users',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/admin/admins',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmin,
);
router.post(
  '/admin/add-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createUser,
);

//* Admin Update
router.patch(
  '/admin/edit-profile/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  AdminController.updateAdmin,
);
router.get(
  '/admin/me/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.myProfile,
);

export const AuthRoutes = router;
