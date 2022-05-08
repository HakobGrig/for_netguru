import * as express from 'express';
import {
    validate
} from "class-validator";

import {
    HTTP_METHODS
} from "../common";

async function validateBody<T extends object>(validatorClass: new () => T, req: any, res: any, next: any) {
    let body = new validatorClass();
    Object.assign(body, req.body);

    const errors = await validate(body);
    if (errors.length > 0) {
        next(new Error('validation error'));
    } else {
        next();
    }
}

export function _RegisterEndPoint<req extends  {}, res extends  {}>(
    express: express.Express,
    path: string,
    method: HTTP_METHODS,
    reqValidatorClass: new () => req,
    resValidatorClass: new () => res,
    handler: (req: express.Request<any, any, req>, res: express.Response<res>) => void,
) {
    express.use(path, validateBody.bind(null, reqValidatorClass));
    express[method](path, handler);
}