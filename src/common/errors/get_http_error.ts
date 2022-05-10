import * as appError from './app_error';
import {InvalidToken, LimitReached, ValidationError} from "./app_error";

const appErrorToHttpCode = new Map<any, number>([
    [appError.Unknown, 500],
    [appError.NotFound, 404],
    [appError.InvalidToken, 401],
    [appError.ValidationError, 400],
    [appError.LimitReached, 429]
]);

export function GetHttpError(inputError: any) : number | undefined {
    for (let [error, code] of appErrorToHttpCode) {
        if (inputError instanceof error) {
            return code;
        }
    }
    return undefined;
}