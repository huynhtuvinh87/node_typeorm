import { NextFunction, Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { Service } from 'typedi';
import { SessionService } from '../../services/SessionService';
import { BaseResponse } from '../../services/BaseResponse';

@Service()
@Controller('api')
export class LogoutController {

  private dataResponse: BaseResponse = new BaseResponse();

  constructor(private readonly sessionService: SessionService) { }

  @Post('logout')
  private async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.header('Authorization').split(" ")[1]
      this.sessionService.deleteByToken(token)
      res.status(200).json(this.dataResponse)
    } catch (e) {
      next(e);
    }
  }
}


