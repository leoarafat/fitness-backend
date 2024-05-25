import mongoose, { model } from 'mongoose';

const privacySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const aboutUsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const termsAndConditionsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const contactUsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const PrivacyPolicy = model('PrivacyPolicy', privacySchema);
export const AboutUs = model('AboutUs', aboutUsSchema);
export const TermsConditions = model(
  'TermsConditions',
  termsAndConditionsSchema,
);
export const ContactUs = model('ContactUs', contactUsSchema);
