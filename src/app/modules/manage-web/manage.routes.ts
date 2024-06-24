import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ManageController } from './manage.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManageValidation } from './manage-web.validation';
const router = express.Router();

router.post(
  '/add-about-us',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ManageValidation.post),
  ManageController.addAboutUs,
);
router.post(
  '/add-contact-info',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  ManageController.addContactInfo,
);
router.post(
  '/add-terms-conditions',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ManageValidation.post),
  ManageController.addTermsConditions,
);
router.post(
  '/add-contact-us',

  ManageController.addContactUs,
);
router.post(
  '/add-privacy-policy',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ManageValidation.post),
  ManageController.addPrivacyPolicy,
);
router.post(
  '/add-faq',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.addFAQ,
);
router.get(
  '/get-faq',

  ManageController.getFAQ,
);
router.get(
  '/get-privacy-policy',

  ManageController.getPrivacyPolicy,
);
router.get(
  '/get-about-us',

  ManageController.getAboutUs,
);
router.get(
  '/get-terms-conditions',

  ManageController.getTermsConditions,
);
router.get(
  '/get-contact-info',

  ManageController.getContactInfo,
);
router.get(
  '/get-contact-us',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.getContactUs,
);
router.patch(
  '/edit-privacy-policy/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.editPrivacyPolicy,
);
router.patch(
  '/edit-about-us/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.editAboutUs,
);
router.patch(
  '/edit-terms-conditions/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.editTermsConditions,
);
router.patch(
  '/edit-contact-us/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.editContactUs,
);
router.patch(
  '/edit-faq/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.editFAQ,
);
router.patch(
  '/edit-contact-info/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.updateContactInfo,
);
router.delete(
  '/delete-about-us/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.deleteAboutUs,
);
router.delete(
  '/delete-contact-us/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.deleteContactUs,
);
router.delete(
  '/delete-privacy-policy/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.deletePrivacyPolicy,
);
router.delete(
  '/delete-terms-conditions/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.deleteTermsConditions,
);
router.delete(
  '/delete-faq/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ManageController.deleteFAQ,
);
export const ManageRoutes = router;
