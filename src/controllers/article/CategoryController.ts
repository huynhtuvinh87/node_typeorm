import { NextFunction, Request, Response } from 'express';
import { Middleware, Controller, Post, Get, Put, Delete } from '@overnightjs/core';
import { CategoryService } from '../../services/blog/index';
import { Category } from '../../entities/blog/Category';
import { Service } from 'typedi';
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { BaseResponse } from '../../services/BaseResponse';
@Service()
@Controller('api/category')
export class CategoryController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly categoryService: CategoryService) { }

  @Get('parent')
  @Middleware([checkJwt])
  private async getParent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.categoryService.get({
        select: ['id', 'title'],
        where: { parent: null },
      }).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: result}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get('list')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const take = 10
      const skip = req.body.skip ?? 0

      const [result, total]= await this.categoryService.paginate({
        relations: ['parent','children'],
        skip: skip,
        take: take
      }).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: result, skip: skip, take: take, total:total}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get('app/list')
  private async appList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const take = 10
      const skip = req.body.skip ?? 0

      const [result, total]= await this.categoryService.paginate({
        relations: ['parent','children'],
        skip: skip,
        take: take
      }).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: result, skip: skip, take: take, total:total}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('create')  @Middleware([checkJwt])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category: Category = <Category>req.body;
      const create = await this.categoryService.store(category).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: create}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put('update/:id')  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category: Category = <Category>req.body;
      const update = await this.categoryService.update(req.params.id, category).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: update}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Delete('delete/:id')  @Middleware([checkJwt])
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const del = await this.categoryService.delete(req.params.id).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: del}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
