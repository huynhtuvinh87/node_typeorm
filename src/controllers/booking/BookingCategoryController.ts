import { NextFunction, Request, Response } from 'express';
import { Middleware, Controller, Post, Get, Put, Delete } from '@overnightjs/core';
import { BookingCategoryService } from '../../services/booking/BookingCategoryService';
import { BookingCategory } from '../../entities/booking/BookingCategory';
import { Service } from 'typedi';
import { validate } from "class-validator"
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { default as slugify } from 'slugify';
import { BaseResponse } from '../../services/BaseResponse';
@Service()
@Controller('api/booking-category')
export class BookingCategoryController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly bookingCategoryService: BookingCategoryService) { }

  @Get('list')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingCategory = await this.bookingCategoryService.index({
        relations: ['sickCategory'],
      }).catch((e) => {
        throw e;
      });
      this.dataResponse.data = { result: bookingCategory}

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('create')
  @Middleware([checkJwt])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingCategory: BookingCategory = <BookingCategory>req.body;
      const errors = await validate(bookingCategory);
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      bookingCategory.slug = slugify(req.body.title, '-');
      const create = await this.bookingCategoryService.store(bookingCategory);
      this.dataResponse.data = { result: create}

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put('update/:id')
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingCategory: BookingCategory = <BookingCategory>req.body;
      const errors = await validate(bookingCategory)
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      bookingCategory.slug = slugify(req.body.title, '-');
      const update = await this.bookingCategoryService.update(req.params.id, bookingCategory).catch((e) => {
        throw e;
      });
      this.dataResponse.data = { result: update}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Delete('delete/:id')
  @Middleware([checkJwt])
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const del = await this.bookingCategoryService.delete(req.params.id).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: del}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
