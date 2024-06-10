import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CommentController } from './comments.controller';

const router = Router();

router.post('/add', auth(ENUM_USER_ROLE.USER), CommentController.addComment);
router.post('/reply', auth(ENUM_USER_ROLE.ADMIN), CommentController.addReply);
router.post(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  CommentController.allComments,
);
router.post(
  '/single/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  CommentController.singleComment,
);

export const CommentRoutes = router;
