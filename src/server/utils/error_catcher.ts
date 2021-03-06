import * as express from 'express';

export async function ErrorCatcher(
  handler: (req: any, res: any, next: express.NextFunction) => void,
  req: unknown,
  res: unknown,
  next: express.NextFunction
) {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
}
