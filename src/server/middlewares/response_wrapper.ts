import * as express from 'express';
import {
    AppResponse
} from "../common";

export function responseWrapper(
    req: express.Request,
    res: AppResponse,
    next: any,
) {
    let code = 200;
    if (undefined !== res.locals.code) {
        code = res.locals.code;
    }
    res.status(code).send({
        error: null,
        data: res.locals.data,
    });
}