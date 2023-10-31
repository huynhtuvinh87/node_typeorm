import { NextFunction, Request, Response } from "express";
import { Controller, Middleware, Get, Put } from "@overnightjs/core";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { UserService } from "../../services/UserService";
import { User } from "../../entities/auth/User";
import { Service } from "typedi";
import { Like } from "typeorm";
import { PhamarcyService } from "../../services/user/PhamarcyService";
import { Phamarcy } from "../../entities/auth/Phamarcy";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api")
export class PhamarcyController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(
    private readonly userService: UserService,
    private readonly phamarcyService: PhamarcyService
  ) {}

  @Get("phamarcys")
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

      const [result, total] = await this.userService.getDataPhamarcy(params);
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

  @Get("app/phamarcys")
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

      const [result, total] = await this.userService.getDataPhamarcy(params);
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

  @Get("phamarcys/:id")
  @Middleware([checkJwt])
  private async getDoctorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: User = await this.userService
        .findById(req.params.id, {
          relations: ["phamarcy"],
        })
        .catch((e) => {
          throw e;
        });
      this.dataResponse.data = { result: result };

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
  @Put("phamarcys/:id")
  @Middleware([checkJwt])
  private async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const phamarcy: Phamarcy = <Phamarcy>req.body;
      const result = await this.phamarcyService
        .update(req.params.id, phamarcy)
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
