import { NextFunction, Request, Response } from "express";
import { Controller, Middleware, Get, Put } from "@overnightjs/core";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { UserService } from "../../services/UserService";
import { DoctorService } from "../../services/user/DoctorService";
import { User } from "../../entities/auth/User";
import { Doctor } from "../../entities/auth/Doctor";
import { Service } from "typedi";
import { BaseResponse } from "../../services/BaseResponse";

@Service()
@Controller("api")
export class DoctorController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(
    private readonly userService: UserService,
    private readonly doctorService: DoctorService
  ) {}

  @Get("doctors")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = {
        skip: req.query.skip || 0,
        take: req.query.take || 10,
        status: req.query.status || null,
        keyword: req.query.keyword || null,
      };

      const [result, total] = await this.userService.getDataDoctor(params);
      this.dataResponse.data = {
        result: result,
        skip: params.skip,
        take: params.take,
        total: total,
      };

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get("app/doctors")
  private async appList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = {
        skip: req.query.skip || 0,
        take: req.query.take || 10,
        status: req.query.status || null,
        keyword: req.query.keyword || null,
      };

      const [result, total] = await this.userService.getDataDoctor(params);
      this.dataResponse.data = {
        result: result,
        skip: params.skip,
        take: params.take,
        total: total,
      };

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get("doctors/:id")
  @Middleware([checkJwt])
  private async getDoctorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const item: User = await this.userService
        .findById(req.params.id, {
          relations: ["doctor"],
        })
        .catch((e) => {
          throw e;
        });
      this.dataResponse.data = { result: item };

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put("doctors/:id")
  @Middleware([checkJwt])
  private async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctor: Doctor = <Doctor>req.body;
      const result = await this.doctorService
        .update(req.params.id, doctor)
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = { result: result };

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
