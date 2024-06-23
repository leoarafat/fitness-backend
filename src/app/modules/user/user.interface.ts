/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type IEmailOptions = {
  email: string;
  subject: string;
  // template: string;
  // data?: { [key: string]: any };
  html: any;
};
export type IRegistration = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'ADMIN' | 'USER';
  gender: string;
  age: string;
};
export type IActivationToken = {
  token: string;
  activationCode: string;
};
export type IActivationRequest = {
  activation_token: string;
  activation_code: string;
};
export type IReqUser = {
  userId: string;
  role: string;
};

export type IUser = {
  [x: string]: any;
  _id?: string;
  name: string;
  user_name: string;
  email: string;
  phone_number: string;
  password: string;
  address: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'USER';
  profile_image: string;
  cover_image: string;
  date_of_birth: Date;
  location: string;
  active_status: 'online' | 'offline';
  language: string;
  gender: 'male' | 'female' | 'others';
  verifyExpire: Date | null;
  verifyCode: string | null;
  isSubscribed: boolean;
  age: string;
};
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
