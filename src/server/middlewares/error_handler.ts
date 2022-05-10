import * as express from 'express';
import {
    AppResponse
} from "../common";
import {GetHttpError} from "../../common/errors/get_http_error";
import * as appError from '../../common/errors/app_error';

export function ErrorHandler(
    err: any,
    req: express.Request,
    res: AppResponse,
    next: any,
) {
    let errorCode = 500;
    let message = "Internal server error.";

    if (err instanceof appError.AppError) {
        errorCode = GetHttpError(err) ?? errorCode;
        message = err.getMessage();
    }
    res.status(errorCode).send({
        data: null,
        error: {
            message
        }
    })
}