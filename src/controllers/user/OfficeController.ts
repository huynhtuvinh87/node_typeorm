import { NextFunction, Request, Response } from "express";
import { Controller, Middleware, Get, Put } from "@overnightjs/core";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { UserService } from "../../services/UserService";
import { User } from "../../entities/auth/User";
import { Service } from "typedi";
import { OfficeService } from "../../services/user/OfficeService";
import { Office } from "../../entities/auth/Office";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api")
export class OfficeController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(
    private readonly userService: UserService,
    private readonly officeService: OfficeService
  ) {}

  @Get("offices")
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

      const [result, total] = await this.userService.getDataOffice(params);
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

  @Get("app/offices")
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

      const [result, total] = await this.userService.getDataOffice(params);
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

  @Get("offices/:id")
  @Middleware([checkJwt])
  private async getOfficeById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: User = await this.userService
        .findById(req.params.id, {
          relations: ["office"],
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

  @Put("offices/:id")
  @Middleware([checkJwt])
  private async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const office: Office = <Office>req.body;
      const result = await this.officeService
        .update(req.params.id, office)
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
