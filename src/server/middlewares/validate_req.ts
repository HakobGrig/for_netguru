import * as express from 'express';

import {validateObject} from '../utils/';
import {ValidationError} from '../../common/errors';

export async function validateBody<T extends object>(
  validatorClass: new () => T,
  req: express.Request<unknown, unknown, object>,
  res: unknown,
  next: express.NextFunction
) {
  const errors = await validateObject(validatorClass, req.body);
  if (errors.length > 0) {
    next(new ValidationError(`Invalid property: ${errors[0].property}`));
  }
  next();
}
