import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SeriesController } from './series.controller';
import { uploadFile } from '../../middlewares/fileUploader';
const router = Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  SeriesController.createSeries,
);
router.get('/all', SeriesController.allSeries);
router.get('/single/:id', SeriesController.singleSeries);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  SeriesController.deleteSeries,
);
router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  SeriesController.updateSeries,
);
export const SeriesRoutes = router;
