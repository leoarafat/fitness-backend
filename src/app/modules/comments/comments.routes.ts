import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CommentController } from './comments.controller';

const router = Router();

router.post('/add', auth(ENUM_USER_ROLE.USER), CommentController.addComment);
router.post(
  '/reply',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CommentController.addReply,
);
router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  CommentController.allComments,
);
router.get(
  '/single/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  CommentController.singleComment,
);
router.get(
  '/get/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  CommentController.singleCommentByClass,
);

export const CommentRoutes = router;
