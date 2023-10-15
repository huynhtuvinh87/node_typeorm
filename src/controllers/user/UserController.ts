import { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Get } from '@overnightjs/core';
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { Service } from 'typedi';
import { Like } from "typeorm";

@Service()
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const take = 10
      const skip = req.body.skip ?? 0
      const keyword = req.body.keyword ?? ''

      const [result, total] = await this.userService.paginate({
        where: keyword ? { name: Like(`%${keyword}%`), role: 'user' } : { role: 'user' },
        skip: skip,
        take: take
      }).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result, total: total, skip: skip, take: take });
    } catch (e) {
      next(e);
    }
  }

  @Get('users/:id')
  @Middleware([checkJwt])
  private async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item: User = await this.userService.findById(req.params.id).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: item });
    } catch (e) {
      next(e);
    }
  }

}
