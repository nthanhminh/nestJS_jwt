import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUserRequest } from 'src/common/interfaces/requestType.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: IUserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
      try {
        console.log(secret);
        const decoded = jwt.verify(token, secret);
        console.log('Valid token: ' + decoded);
        req.user = decoded;
        next();
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.error('Token đã hết hạn:', error.message);
          res.status(401).json({ message: 'Unauthorized' });
        } else {
          console.error('Invalid token:', error);
          res.status(401).json({ message: 'Unauthorized' });
        }
      }
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  }
}
