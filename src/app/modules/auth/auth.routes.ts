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
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/role-base',
  auth(ENUM_USER_ROLE.USER),
  UserController.userBaseOnGender,
);
router.get(
  '/single-user/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUserById,
);
router.patch(
  '/change-password',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.changePassword,
);
router.post('/forgot-password', UserController.forgotPass);
router.post('/reset-password', UserController.resetPassword);
router.post('/resend', UserController.resendActivationCode);
router.post('/verify-otp', UserController.verifyOtp);

//*IDS Work
router.get(
  '/profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUser,
);
router.patch(
  '/edit-profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
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
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.changePassword,
);
router.get(
  '/admin/profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.myProfile,
);
router.post(
  '/admin/add-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.create),
  AdminController.registrationUser,
);
//* Admin Authentication End

router.get(
  '/admin/users',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/admin/admins',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllAdmin,
);
router.post(
  '/admin/add-user',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createUser,
);

//* Admin Update
router.patch(
  '/admin/edit-profile/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  AdminController.updateAdmin,
);
router.delete(
  '/admin/delete/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),

  AdminController.deleteAdmin,
);

export const AuthRoutes = router;
