import { NextFunction, Request, Response } from 'express';
import { RequestError } from './request-error.type';

export default interface RequestValidators {
  params?: any;
  body?: any;
  query?: any;
}

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error: unknown) {
      if (error instanceof RequestError) {
        res.status(error.status || 419);
      } else {
        res.status(500);
      }
      next(error);
    }
  };
}
