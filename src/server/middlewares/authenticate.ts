import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import {EnvironmentVariables} from '../../env';
import * as appError from '../../common/errors';
import {UserAuthData} from '../../connectors/auth';
import {validateObject} from '../utils';

export async function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  if (undefined !== authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      jwt.verify(token, String(EnvironmentVariables.server.JWT_SECRET));
    } catch (err) {
      throw new appError.InvalidToken('Invalid token');
    }
    const userAuthData = jwt.decode(token);
    if (null === userAuthData || typeof userAuthData === 'string') {
      throw new appError.InvalidToken(
        'Invalid token, unexpected decoded body.'
      );
    } else {
      const errors = await validateObject(UserAuthData, userAuthData);
      if (errors.length > 0) {
        throw new appError.InvalidToken(
          'Invalid token, unable to validate body'
        );
      }
    }

    res.locals.userAuthData = userAuthData;
    next();
    return;
  }
  res.locals.userAuthData = null;
  next();
}
