import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import User from '../modules/user/user.model';
import Admin from '../modules/admin/admin.model';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.headers.authorization;

      if (!tokenWithBearer) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized for this role',
        );
      }

      if (tokenWithBearer && tokenWithBearer.startsWith('Bearer')) {
        const token = tokenWithBearer.split(' ')[1];

        //verify token
        const verifyUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret,
        );

        //set user to headers
        req.user = verifyUser;
        const isExist = await User.findById(verifyUser?.userId);
        const checkAdmin = await Admin.findById(verifyUser?.userId);
        if (verifyUser.role === 'user' && !isExist) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        if (verifyUser.role === 'admin' && !checkAdmin) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        //guard user
        if (roles.length && !roles.includes(verifyUser.role)) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            'Access Forbidden: You do not have permission to perform this action',
          );
        }
        next();
      }
    } catch (error) {
      next(error);
    }
  };

export default auth;
