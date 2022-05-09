import * as express from 'express';
import {
    AppResponse
} from "../common";

export function authGuard(
    req: express.Request,
    res: AppResponse,
    next: any,
) {
    console.log('auth guard');
    if (null === res.locals.userAuthData) {
        next('NOT_AUTHORIZED');
        return;
    }
    next();
}