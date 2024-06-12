/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/ApiError';
import { logger } from '../../../shared/logger';
import {
  AboutUs,
  ContactInformation,
  ContactUs,
  FAQ,
  PrivacyPolicy,
  TermsConditions,
} from './manage.model';

//*
const addPrivacyPolicy = async (payload: any) => {
  const checkIsExist = await PrivacyPolicy.findOne();
  if (checkIsExist) {
    await PrivacyPolicy.findOneAndUpdate({}, payload, {
      new: true,

      runValidators: true,
    });
  } else {
    return await PrivacyPolicy.create(payload);
  }
};
const getPrivacyPolicy = async () => {
  return await PrivacyPolicy.find({});
};
const editPrivacyPolicy = async (
  id: string,
  payload: { description: string },
) => {
  const isExist = await PrivacyPolicy.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Privacy Policy not found');
  }
  const result = await PrivacyPolicy.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deletePrivacyPolicy = async (id: string) => {
  const isExist = await PrivacyPolicy.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Privacy Policy not found');
  }
  return await PrivacyPolicy.findByIdAndDelete(id);
};
//*
const addAboutUs = async (payload: any) => {
  const checkIsExist = await AboutUs.findOne();
  if (checkIsExist) {
    await AboutUs.findOneAndUpdate({}, payload, {
      new: true,

      runValidators: true,
    });
  } else {
    return await AboutUs.create(payload);
  }
};
const getAboutUs = async () => {
  return await AboutUs.findOne({});
};
const editAboutUs = async (id: string, payload: { description: string }) => {
  const isExist = await AboutUs.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'AboutUs not found');
  }
  const result = await AboutUs.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAboutUs = async (id: string) => {
  const isExist = await AboutUs.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'AboutUs not found');
  }
  return await AboutUs.findByIdAndDelete(id);
};
//*
const addFAQ = async (payload: any) => {
  return await FAQ.create(payload);
};
const getFAQ = async () => {
  return await FAQ.find({});
};
const editFAQ = async (
  id: string,
  payload: { question: string; answer: string },
) => {
  const isExist = await FAQ.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Faq not found');
  }
  const result = await FAQ.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteFAQ = async (id: string) => {
  const isExist = await FAQ.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Faq not found');
  }
  return await FAQ.findByIdAndDelete(id);
};
//*
const addTermsConditions = async (payload: any) => {
  const checkIsExist = await TermsConditions.findOne();
  if (checkIsExist) {
    await TermsConditions.findOneAndUpdate({}, payload, {
      new: true,

      runValidators: true,
    });
  } else {
    return await TermsConditions.create(payload);
  }
};
const getTermsConditions = async () => {
  return await TermsConditions.find({});
};
const editTermsConditions = async (
  id: string,
  payload: { description: string },
) => {
  const isExist = await TermsConditions.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'TermsConditions not found');
  }
  const result = await TermsConditions.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteTermsConditions = async (id: string) => {
  const isExist = await TermsConditions.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'TermsConditions not found');
  }
  return await TermsConditions.findByIdAndDelete(id);
};

//*
const addContactUs = async (payload: any) => {
  return await ContactUs.create(payload);
};
const getContactUs = async () => {
  return await ContactUs.find({});
};
const editContactUs = async (id: string, payload: { description: string }) => {
  const isExist = await ContactUs.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'ContactUs not found');
  }
  const result = await ContactUs.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteContactUs = async (id: string) => {
  const isExist = await ContactUs.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'ContactUs not found');
  }
  return await ContactUs.findByIdAndDelete(id);
};
//*
const addContactInfo = async (payload: any) => {
  if (!payload) {
    throw new ApiError(400, 'Please provide data');
  }
  return await ContactInformation.create(payload);
};
const getContactInfo = async () => {
  try {
    const results = await ContactInformation.find({});

    const updatedResult = results.reduce(
      (acc, res) => {
        res.email.forEach(email => {
          //@ts-ignore
          acc.email.push({ id: res._id, email });
        });
        res.phone.forEach(phone => {
          //@ts-ignore
          acc.phone.push({ id: res._id, phone });
        });
        return acc;
      },
      { email: [], phone: [] },
    );

    return [updatedResult];
  } catch (error) {
    logger.error('Error fetching contact information:', error);
    throw error;
  }
};

export const ManageService = {
  addPrivacyPolicy,
  addAboutUs,
  addTermsConditions,
  addContactUs,
  getPrivacyPolicy,
  getAboutUs,
  getTermsConditions,
  getContactUs,
  editPrivacyPolicy,
  editAboutUs,
  editTermsConditions,
  editContactUs,
  deleteAboutUs,
  deleteContactUs,
  deletePrivacyPolicy,
  deleteTermsConditions,
  addContactInfo,
  getContactInfo,
  addFAQ,
  getFAQ,
  editFAQ,
  deleteFAQ,
};
