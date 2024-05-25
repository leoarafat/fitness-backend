import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { messageController } from './message.controller';
import { uploadFile } from '../../middlewares/fileUploader';
import { validateRequest } from '../../middlewares/validateRequest';
import { MessageValidation } from './messages.validation';

// import { configureFileUpload } from '../../../utils/multer';

const router = express.Router();
router.post(
  '/create-group',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  messageController.createGroupChat,
);
router.post(
  '/join-group/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  messageController.joinGroup,
);
router.post(
  '/send-message/:id', //here id is receiver id
  uploadFile(),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  validateRequest(MessageValidation.messages),
  messageController.sendMessage,
);
router.post(
  '/group-chat/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  messageController.sendGroupMessage,
);
router.get(
  '/get-message/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  messageController.getMessages,
);
router.get(
  '/get-group-message/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  messageController.getGroupMessages,
);

export const MessageRoutes = router;
