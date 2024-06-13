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
    subject: {
      type: String,
      required: true,
    },
    options: {
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
const contactInformationSchema = new mongoose.Schema(
  {
    email: [
      {
        email: {
          type: String,
          required: true,
        },
      },
    ],
    number: [
      {
        number: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
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
export const ContactInformation = model(
  'ContactInformation',
  contactInformationSchema,
);
export const FAQ = model('FAQ', faqSchema);
