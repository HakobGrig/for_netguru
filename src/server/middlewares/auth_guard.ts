import * as express from 'express';

import * as appError from '../../common/errors';
import {AppResponse} from '../common';

export function authGuard(
  req: express.Request,
  res: AppResponse,
  next: express.NextFunction
) {
  if (null === res.locals.userAuthData) {
    throw new appError.NotAuthorized('Permission denied.');
  }
  next();
}
