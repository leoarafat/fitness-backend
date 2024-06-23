import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IReqUser, IUser } from './user.interface';
import catchAsync from '../../../shared/catchasync';
import config from '../../../config';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';

const registrationUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.registrationUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Successfully Registered`,
      data: result,
    });
  },
);
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    const result = await UserService.createUser(userData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers(req.query);
  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.user as IReqUser);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
const getSingleUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUserById(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);
  const { refreshToken } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User loggedin successfully !',
    data: result,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  await UserService.changePassword(user, passwordData);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Password change successfully !',
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateProfile(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
const forgotPass = catchAsync(async (req: Request, res: Response) => {
  await UserService.forgotPass(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Check your email!',
  });
});
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.verifyOtp(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success!',
    data: result,
  });
});

const resendActivationCode: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await UserService.resendActivationCode(data);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Resend successfully',
      data: result,
    });
  },
);
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  // const token = req.headers.authorization || '';
  await UserService.resetPassword(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Account recovered!',
  });
});
const userBaseOnGender = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.userBaseOnGender();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successful!',
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  registrationUser,
  login,
  changePassword,
  refreshToken,
  updateProfile,
  forgotPass,
  resetPassword,
  userBaseOnGender,
  resendActivationCode,
  verifyOtp,
  getSingleUserById,
};
