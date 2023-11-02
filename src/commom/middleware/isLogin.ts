import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class IsLoginMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
            if (decoded) {
                console.log(decoded);
                next();
            }
        } else {
            throw new Error('You are not authorized');
        }
    }
}