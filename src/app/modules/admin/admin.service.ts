/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';
import { IRegistration, IReqUser, IUser } from '../user/user.interface';
import User from '../user/user.model';
import Admin from './admin.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../../builder/QueryBuilder';
import { IGenericResponse } from '../../../interfaces/paginations';
import { updateImageUrl } from '../../../utils/url-modifier';
import { IAdmin } from './admin.interface';
import { sendResetEmail } from '../auth/sendResetMails';
import { ENUM_USER_ROLE } from '../../../enums/user';
import sendEmail from '../../../utils/sendEmail';
import { registrationSuccessEmailBody } from '../../../mails/user.register';

//*
const registrationUser = async (payload: IRegistration) => {
  const { name, email, password } = payload;

  const user = {
    name,
    email,
    password,
  };
  const isEmailExist = await Admin.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }
  const newUser = await Admin.create(payload);
  const data = { user: { name: user.name } };
  sendEmail({
    email: user.email,
    subject: 'Congratulations to register successfully',
    html: registrationSuccessEmailBody(data),
  }).catch(error => {
    console.error('Failed to send email:', error);
  });
  const { password: omit, ...userWithoutPassword } = newUser.toObject();

  return userWithoutPassword;
};
//*
const createUser = async (userData: IUser): Promise<IUser | null> => {
  const newUser = await User.create(userData);
  return newUser;
};
//*
const getAllUsers = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IUser[]>> => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(['name', 'email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
//*
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};
const getAllAdmin = async () => {
  const results = await Admin.find({}).lean();
  const updatedResults = results.map(result => {
    if (result) {
      const updatedResult = {
        ...result,
        profile_image: updateImageUrl(result.profile_image).replace(/\\/g, '/'),
      };
      return updatedResult;
    }
    return result;
  });
  return updatedResults;
};
//*
const updateAdmin = async (
  id: string,
  req: Request,
): Promise<IAdmin | null> => {
  //@ts-ignore
  const { files } = req;

  let profile_image = undefined;

  //@ts-ignore
  if (files && files?.profile_image) {
    //@ts-ignore
    profile_image = `/images/profile/${files.profile_image[0].filename}`;
  }

  //@ts-ignore
  const data = req.body;
  if (!data) {
    throw new Error('Data is missing in the request body!');
  }

  const isExist = await Admin.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'Admin not found !');
  }

  const { ...adminData } = data;
  //@ts-ignore
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  const result = await Admin.findOneAndUpdate(
    { _id: id },
    { profile_image, ...updatedAdminData },
    {
      new: true,
    },
  );
  return result;
};
//*
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
//*
const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const isUserExist = await Admin.isAdminExist(payload?.email);
  const admin = await Admin.findOne({ email: payload?.email });
  //@ts-ignore

  if (!isUserExist) {
    throw new ApiError(404, 'Admin does not exist');
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(payload?.password, isUserExist.password))
  ) {
    throw new ApiError(402, 'Password or email is incorrect');
  }

  //create access token & refresh token

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    //@ts-ignore
    yourInfo: admin,
  };
};
//*
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(402, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await Admin.isAdminExist(userId);
  if (!isUserExist) {
    throw new ApiError(403, 'Admin does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};
//*
const changePassword = async (
  user: IReqUser,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isAdminExist = await Admin.findOne({ _id: user?.userId }).select(
    '+password',
  );

  if (!isAdminExist) {
    throw new ApiError(404, 'Admin does not exist');
  }
  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(oldPassword, isAdminExist.password))
  ) {
    throw new ApiError(402, 'Old password is incorrect');
  }
  isAdminExist.password = newPassword;
  isAdminExist.save();
};
//*
const forgotPass = async (payload: { email: string }) => {
  const admin = await Admin.findOne(
    { email: payload.email },
    { _id: 1, role: 1 },
  );

  if (!admin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin does not exist!');
  }

  let profile = null;
  if (admin.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ _id: admin?._id });
  }

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!');
  }

  if (!profile.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!');
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { _id: admin._id },
    config.jwt.secret as string,
    '30m',
  );

  // const resetLink: string = config.resetlink + `token=${passResetToken}`;
  const resetLink: string = `${config.resetlink}token=${passResetToken}&email=${profile.email}`;
  sendResetEmail(
    profile.email,
    `
      <div>
        <p>Hi, ${profile.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
  );
};
//*
const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const { email, newPassword } = payload;
  const admin = await Admin.findOne({ email }, { _id: 1 });

  if (!admin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'admin not found!');
  }

  await jwtHelpers.verifyToken(token, config.jwt.secret as string);

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await Admin.updateOne({ email }, { password }, { new: true });
};
//*
const myProfile = async (user: IReqUser) => {
  const result = await Admin.findById(user?.userId);
  if (!result) {
    throw new ApiError(404, 'Profile not found');
  }
  return result;
};

export const AdminService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  registrationUser,
  login,
  changePassword,
  refreshToken,
  updateAdmin,
  getAllAdmin,
  myProfile,
  forgotPass,
  resetPassword,
};
