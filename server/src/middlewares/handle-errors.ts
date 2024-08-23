import ErrorResponse, { RequestError } from './request-error.type';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  const response: any = {};
  let message: any = err.message;
  if (err instanceof RequestError) {
    res.status(err.status || 419);
    message = `${err.name}: ${message}`;
  } else {
    res.status(500);
    //  TODO: log error and remove stack trace in PROD 💥
    response.stack = err.stack;
    message = `${err.name}: ${message}`;
  }
  response.message = message;
  res.json(response);
}
