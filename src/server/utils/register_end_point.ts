import * as express from 'express';
import {
    validateBody
} from '../middlewares/validate_req'

import {
    AppResponse, AppResponseAuthenticated,
    HTTP_METHODS
} from "../common";

import {
    ErrorCatcher
} from './error_catcher';

export function RegisterEndPoint<req extends  {}, res extends  {}>(
    express: express.Express,
    path: string,
    method: HTTP_METHODS,
    reqValidatorClass: new () => req,
    resValidatorClass: new () => res,
    handler: (req: express.Request<any, any, req>, res: any, next: express.NextFunction) => void,
    middlewares: ((req: express.Request, res: AppResponse, next: any)=> void)[]
) {
    middlewares.forEach((el) => {
        express[method](path, ErrorCatcher.bind(null, el))
    });
    express[method](path, ErrorCatcher.bind(null, validateBody.bind(null, reqValidatorClass)));
    express[method](path, ErrorCatcher.bind(null, handler));
}