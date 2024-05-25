// import express from 'express';
// import { AdminController } from './admin.controller';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import { UserController } from '../user/user.controller';
// import { uploadFile } from '../../middlewares/fileUploader';

// const router = express.Router();
// //* Admin Authentication Start
// router.post('/register', AdminController.registrationUser);
// router.post('/login', AdminController.login);
// router.post('/refresh-token', AdminController.refreshToken);
// router.post('/forgot-password', AdminController.forgotPass);
// router.post('/reset-password', AdminController.resetPassword);
// router.patch('/change-password/:id', AdminController.changePassword);
// router.post(
//   '/add-admin',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   AdminController.registrationUser,
// );
// //* Admin Authentication End

// router.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
// router.get('/admins', auth(ENUM_USER_ROLE.ADMIN), AdminController.getAllAdmin);
// router.post(
//   '/add-user',
//   auth(ENUM_USER_ROLE.ADMIN),
//   AdminController.createUser,
// );

// //* Admin Update
// router.patch('/edit-profile/:id', uploadFile(), AdminController.updateAdmin);
// router.get('/me/:id', auth(ENUM_USER_ROLE.ADMIN), AdminController.myProfile);
// export const AdminRoutes = router;
