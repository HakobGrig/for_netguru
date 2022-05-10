import * as appError from './app_error';

const appErrorToHttpCode = new Map<new () => unknown, number>([
  [appError.Unknown, 500],
  [appError.NotFound, 404],
  [appError.InvalidToken, 401],
  [appError.NotAuthorized, 401],
  [appError.ValidationError, 400],
  [appError.LimitReached, 429],
]);

export function GetHttpError(inputError: unknown): number | undefined {
  for (const [error, code] of appErrorToHttpCode) {
    if (inputError instanceof error) {
      return code;
    }
  }
  return undefined;
}
