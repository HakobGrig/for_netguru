import * as express from 'express';

import {ErrorCatcher} from './error_catcher';

export function RegisterMiddleware(
  express: express.Express,
  path: string,
  middlewares: ((
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void)[]
) {
  middlewares.forEach(el => {
    express.use(path, ErrorCatcher.bind(null, el));
  });
}
