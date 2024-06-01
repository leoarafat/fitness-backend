import { Router } from 'express';
import { ProgramController } from './program.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
const router = Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  ProgramController.createProgram,
);
router.get('/all', ProgramController.allPrograms);
router.get('/:id', ProgramController.singleProgram);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ProgramController.deleteProgram,
);
router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  ProgramController.updateProgram,
);
export const ProgramRoutes = router;