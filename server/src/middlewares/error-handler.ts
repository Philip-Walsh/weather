import { NextFunction, Request, Response } from 'express';
import { RequestError, ErrorResponse } from './request-error.type';
import { HttpSuccessStatus } from './http.type';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const method = req.method as keyof typeof HttpSuccessStatus;
  const expectedStatus = HttpSuccessStatus[method];

  const statusCode = res.statusCode !== expectedStatus ? res.statusCode : 500;

  const message = `${err.name}: ${err.message}`;

  const response: ErrorResponse = { message };

  if (err instanceof RequestError) {
    res.status(err.status || 419);
  } else {
    res.status(500);
    if (process.env.NODE_ENV !== 'production') {
      // TODO: log error in production
      response.stack = err.stack; //?.split('\n');
    }
  }

  response.message = message;
  res.status(statusCode).json(response);
}
