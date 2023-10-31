import { NextFunction, Request, Response } from 'express';
import { Controller, Post, Get, Put, Delete, Middleware } from '@overnightjs/core';
import { BookingService } from '../../services/booking/BookingService';
import { Booking } from '../../entities/booking/Booking';
import { Service } from 'typedi';
import { validate } from "class-validator"
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { BaseResponse } from '../../services/BaseResponse';
@Service()
@Controller('api/booking')
export class BookingController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly bookingService: BookingService) { }
  @Get('list')
  @Middleware([checkJwt])
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = {
        skip: req.query.skip || 0,
        take: req.query.take || 10,
        status: req.query.status || null,
        category: req.query.category || null,
        doctor: req.query.doctor || null,
        user: req.query.user || null,
        keyword: req.query.keyword || null,
      };
      const [result, total] = await this.bookingService.getData(params);
      this.dataResponse.data = { result: result, skip: params.skip, take: params.take, total:total}
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('create')
  @Middleware([checkJwt])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking: Booking = <Booking>req.body;
      const errors = await validate(booking)
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      const result = await this.bookingService.store(booking).catch((e) => {
        throw e;
      });
      this.dataResponse.data = { result: result }
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put('update/:id')
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking: Booking = <Booking>req.body;
      const errors = await validate(booking)
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      const result = await this.bookingService.update(req.params.id, booking).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: result }
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Delete('delete/:id')
  @Middleware([checkJwt])
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const detele = await this.bookingService.delete(req.params.id).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: detele }
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
