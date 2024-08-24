import { Request, Response, NextFunction } from 'express';
import { HttpRequest, HttpMethod, HttpSuccessStatus } from './http.type';


export function expressCallback(controller: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const httpRequest: HttpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
                method: req.method as HttpMethod,
                path: req.path,
                headers: {
                    'Content-Type': req.get('Content-Type') || '',
                    'User-Agent': req.get('User-Agent') || ''
                }
            };
            const result = await controller(httpRequest);
            console.log({result});
            const httpStatus = HttpSuccessStatus[httpRequest.method];
            console.log({httpStatus});
            const headers = {
                'Content-Type': 'application/json'
            };
            res.set(headers);
            res.type('json');
            res.status(httpStatus).send(result);
        } catch (error) {
            next(error);
        }
    };
}
