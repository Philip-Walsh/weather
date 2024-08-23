import { NotFoundError } from "./request-error.type";
import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
    // res.status(404);
    const error = new NotFoundError(`404 - Not Found - ${req.originalUrl}`);
    next(error);
  }