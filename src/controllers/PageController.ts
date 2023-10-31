import { NextFunction, Request, Response } from 'express';
import { Controller, Post, Get, Put, Delete, Middleware } from '@overnightjs/core';
import { PageService } from '../services/PageService';
import { Page } from '../entities/Page';
import { Service } from 'typedi';
import { validate } from "class-validator"
import { Like } from "typeorm";
import { default as slugify } from 'slugify';
import { checkJwt } from '../middleware/checkJwt.middleware';
import { BaseResponse } from "../services/BaseResponse";
@Service()
@Controller('api/page')
export class PageController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly pageService: PageService) { }
  
  @Get('list')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const take = req.query.take ? Number(req.query.take) : 10
      const skip = req.query.skip ? Number(req.query.skip) : 0
      const keyword = req.body.keyword ?? ''

      const [result, total]= await this.pageService.paginate({
        select: ['id','title','content', 'status'],
        where: keyword ? { title: Like(`%${keyword}%`) } : {},
        skip: skip,
        take: take
      }).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: result,
        skip: skip,
        take: take,
        total: total,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('create')
  @Middleware([checkJwt])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page : Page = <Page>req.body;

      const errors = await validate(page)
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      page.slug = slugify(req.body.title, '-');
      const result = await this.pageService.store(page).catch((e) => {
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

  @Put('update/:id')
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page : Page = <Page>req.body;
      const errors = await validate(page)
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      const result = await this.pageService.update(req.params.id, page).catch((e) => {
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

  @Delete('delete/:id')
  @Middleware([checkJwt])
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.pageService.delete(req.params.id).catch((e) => {
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
