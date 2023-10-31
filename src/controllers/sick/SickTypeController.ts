import { NextFunction, Request, Response } from 'express';
import { Middleware, Controller, Post, Get, Put, Delete } from '@overnightjs/core';
import { SickTypeService } from '../../services/sick/SickTypeService';
import { SickType } from '../../entities/sick/SickType';
import { Service } from 'typedi';
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { sickTypeRequest } from '../../requests/sickTypeRequest';
import { default as slugify } from 'slugify';
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller('api/sick-type')
export class SickTypeController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly sickTypeService: SickTypeService) { }

  @Get('list')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sickType = await this.sickTypeService.index({
        where: req.query.status ? { status: req.query.status} : {},
      }).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: sickType,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get('app/list')
  private async appList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sickType = await this.sickTypeService.index({
        where: req.query.status ? { status: req.query.status} : {},
      }).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: sickType,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('create')
  @Middleware([checkJwt, sickTypeRequest])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sickType: SickType = <SickType>req.body;
      sickType.slug = slugify(req.body.title, '-')
      const create = await this.sickTypeService.store(sickType).catch((e) => {
        throw e;
      });
      this.dataResponse.data = {
        result: create,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put('update/:id')
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sickType: SickType = <SickType>req.body;
      sickType.slug = slugify(req.body.title);
      const update = await this.sickTypeService.update(req.params.id, sickType).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: update,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Delete('delete/:id')
  @Middleware([checkJwt])
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const del = await this.sickTypeService.delete(req.params.id).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: del,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
