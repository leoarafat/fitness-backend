import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
import { BlogController } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  validateRequest(BlogValidation.post),
  BlogController.addBlog,
);
router.get(
  '/get-all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.getBlogs,
);
router.get(
  '/single/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BlogController.getSingleBlog,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.deleteBlog,
);
router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  // validateRequest(BlogValidation.update),
  BlogController.updateBlog,
);

export const BlogRoutes = router;
