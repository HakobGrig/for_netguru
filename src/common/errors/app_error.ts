export class AppError extends Error {
  constructor(protected mMsg: string) {
    super();
  }
  get message() {
    return this.mMsg;
  }
}

export class Unknown extends AppError {
  constructor(protected mMsg: string = 'Not Found.') {
    super(mMsg);
  }
}

export class NotFound extends AppError {
  constructor(protected mMsg: string = 'Not Found.') {
    super(mMsg);
  }
}

export class EnvNotFound extends AppError {
  constructor(protected mMsg: string = 'Invalid environment variable.') {
    super(mMsg);
  }
}

export class ValidationError extends AppError {
  constructor(protected mMsg: string = 'Invalid object.') {
    super(mMsg);
  }
}

export class InvalidToken extends AppError {
  constructor(protected mMsg: string = 'Invalid token.') {
    super(mMsg);
  }
}

export class LimitReached extends AppError {
  constructor(protected mMsg: string = 'Limit reached.') {
    super(mMsg);
  }
}

export class NotAuthorized extends AppError {
  constructor(protected mMsg: string = 'Not authorized.') {
    super(mMsg);
  }
}
