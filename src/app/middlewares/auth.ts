import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith('Bearer')) {
      try {
        token = authorization.split(' ')[1];
        if (!token) {
          throw new ApiError(401, 'You are not authorized for this role');
        }
        // verify token
        let verifiedUser = null;

        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret,
        );

        req.user = verifiedUser; // role , userid

        // Guard for role
        if (
          requiredRoles.length &&
          !requiredRoles.includes(verifiedUser.role)
        ) {
          throw new ApiError(
            403,
            'Access Forbidden: You do not have permission to perform this action.',
          );
        }
        next();
      } catch (error) {
        next(error);
      }
    }
  };

export default auth;
