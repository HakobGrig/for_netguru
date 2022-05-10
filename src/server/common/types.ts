import * as express from 'express';

import {UserAuthData} from '../../connectors/auth';

export type AppResponse<T1 = unknown> = express.Response<
  T1,
  {
    userAuthData: UserAuthData | null;
    data: object;
    code: number | undefined;
  }
>;

export type AppResponseAuthenticated<T1 = unknown> = express.Response<
  T1,
  {
    userAuthData: UserAuthData;
    data: object;
    code: number | undefined;
  }
>;

export enum HTTP_METHODS {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}
