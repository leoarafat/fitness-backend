import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ManageController } from './manage.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManageValidation } from './manage-web.validation';
const router = express.Router();

router.post(
  '/add-about-us',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ManageValidation.post),
  ManageController.addAboutUs,
);
router.post(
  '/add-terms-conditions',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ManageValidation.post),
  ManageController.addTermsConditions,
);
router.post(
  '/add-contact-us',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ManageValidation.contactUs),
  ManageController.addContactUs,
);
router.post(
  '/add-privacy-policy',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ManageValidation.post),
  ManageController.addPrivacyPolicy,
);
router.get(
  '/get-privacy-policy',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.getPrivacyPolicy,
);
router.get(
  '/get-about-us',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.getAboutUs,
);
router.get(
  '/get-terms-conditions',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.getTermsConditions,
);
router.get(
  '/get-contact-us',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.getContactUs,
);
router.patch(
  '/edit-privacy-policy/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.editPrivacyPolicy,
);
router.patch(
  '/edit-about-us/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.editAboutUs,
);
router.patch(
  '/edit-terms-conditions/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.editTermsConditions,
);
router.patch(
  '/edit-contact-us/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.editContactUs,
);
router.delete(
  '/delete-about-us/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.deleteAboutUs,
);
router.delete(
  '/delete-contact-us/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.deleteContactUs,
);
router.delete(
  '/delete-privacy-policy/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.deletePrivacyPolicy,
);
router.delete(
  '/delete-terms-conditions/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ManageController.deleteTermsConditions,
);
export const ManageRoutes = router;
