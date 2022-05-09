import * as express from 'express';
import {
    validateBody
} from '../middlewares/validate_req'

import {
    AppResponse, AppResponseAuthenticated,
    HTTP_METHODS
} from "../common";

export function _RegisterEndPoint<req extends  {}, res extends  {}>(
    express: express.Express,
    path: string,
    method: HTTP_METHODS,
    reqValidatorClass: new () => req,
    resValidatorClass: new () => res,
    handler: (req: express.Request<any, any, req>, res: AppResponseAuthenticated<res>, next: express.NextFunction) => void,
    middlewares: ((req: express.Request, res: AppResponse, next: any)=> any)[]
) {
    express.use(path, validateBody.bind(null, reqValidatorClass),...middlewares);
    express[method](path, handler);
}