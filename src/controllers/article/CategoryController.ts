import { NextFunction, Request, Response } from 'express';
import { Middleware, Controller, Post, Get, Put, Delete } from '@overnightjs/core';
import { CategoryService } from '../../services/blog/index';
import { Category } from '../../entities/blog/Category';
import { Service } from 'typedi';
import { validate } from "class-validator"
import { checkJwt } from '../../middleware/checkJwt.middleware';

@Service()
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('list')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const category = await this.categoryService.index({
        relations: ['children'],
      }).catch((e) => {
        throw e;
      });
    
      res.status(200).json({ data: category });
    } catch (e) {
      next(e);
    }
  }

  @Post('create')
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let category = new Category()
      category.title = req.body.title
      category.parent = req.body.parent_id
      category.status = req.body.status
      const errors = await validate(category)
      if (errors.length > 0) {
        res.status(422).json( errors );
      }
      category = await this.categoryService.store(category).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: category });
    } catch (e) {
      next(e);
    }
  }

  @Put('update/:id')
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category: Category = <Category>req.body;
      const errors = await validate(category)
      if (errors.length > 0) {
        res.status(422).json( errors );
      }
      const update = await this.categoryService.update(req.params.id, category).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: update });
    } catch (e) {
      next(e);
    }
  }

  @Delete('delete/:id')
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const detele = await this.categoryService.delete(req.params.id).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: detele });
    } catch (e) {
      next(e);
    }
  }
}
