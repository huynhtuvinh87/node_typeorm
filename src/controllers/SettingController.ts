import { NextFunction, Request, Response } from 'express';
import { Controller, Post, Get, Put, Delete, Middleware } from '@overnightjs/core';
import { SettingService } from '../services/SettingService';
import { Setting } from '../entities/Setting';
import { Service } from 'typedi';
import { validate } from "class-validator"
import { checkJwt } from '../middleware/checkJwt.middleware';
import { BaseResponse } from "../services/BaseResponse";
@Service()
@Controller('api/setting')
export class SettingController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly settingService: SettingService) { }
  
  @Put('update')
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const setting: Setting = <Setting>req.body;
      const errors = await validate(setting)
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      const result = await this.settingService.update(1, setting).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: result,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get('get')
  @Middleware([checkJwt])
  private async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.settingService.findById(1).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: result,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

}
