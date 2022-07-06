import { Injectable, NestMiddleware, HttpException, BadRequestException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'
import { users } from '../../db';

@Injectable()
export class ValidUserMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const userExists = users.some(user => {
            return user.id === userId
        });
        if (!userExists) {
            throw new BadRequestException("User does not exist")
        }
        next()
    }
}