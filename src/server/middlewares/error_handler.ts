import * as express from 'express';

import * as appError from '../../common/errors/app_error';
import {AppResponse} from '../common';
import {GetHttpError} from '../../common/errors/get_http_error';

export function ErrorHandler(
  err: unknown,
  req: express.Request,
  res: AppResponse,
  next: express.NextFunction
) {
  let errorCode = 500;
  let message = 'Internal server error.';

  if (err instanceof appError.AppError) {
    errorCode = GetHttpError(err) ?? errorCode;
    message = err.message;
  }
  res.status(errorCode).send({
    data: null,
    error: {
      message,
    },
  });
}
