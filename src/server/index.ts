import * as express from 'express';

import {RegisterMovieEndPoints} from './endpoints/movie/index';

import {authenticate, responseWrapper} from './middlewares';
import {RegisterMiddleware} from './utils/register_middlware';
import {ErrorHandler} from './middlewares/error_handler';
import {EnvironmentVariables} from '../env';

export async function init() {
  const app = express();
  app.use(express.json());

  RegisterMiddleware(app, '*', [authenticate]);
  RegisterMovieEndPoints(app);

  app.use(responseWrapper);
  app.use(ErrorHandler);

  app.listen(EnvironmentVariables.server.APP_PORT, () => {
    console.log('Server started.');
    console.log(`Listening on port ${EnvironmentVariables.server.APP_PORT}`);
  });
}
