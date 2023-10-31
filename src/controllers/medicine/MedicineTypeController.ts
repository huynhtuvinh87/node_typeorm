import { NextFunction, Request, Response } from "express";
import {
  Middleware,
  Controller,
  Post,
  Get,
  Put,
  Delete,
} from "@overnightjs/core";
import { MedicineTypeService } from "../../services/medicine/index";
import { MedicineType } from "../../entities/medicine/MedicineType";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { default as slugify } from "slugify";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/medicine-type")
export class MedicineTypeController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly medicineTypeService: MedicineTypeService) {}

  @Get("list")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicineType = await this.medicineTypeService.index().catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: medicineType };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Get("app/list")
  private async appList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicineType = await this.medicineTypeService.index().catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: medicineType };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post("create")
  @Middleware([checkJwt])
  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicineType: MedicineType = <MedicineType>req.body;
      const errors = await validate(medicineType);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      medicineType.slug = slugify(req.body.title, "-");
      const create = await this.medicineTypeService
        .store(medicineType)
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = { result: create };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put("update/:id")
  @Middleware([checkJwt])
  private async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicineType: MedicineType = <MedicineType>req.body;
      const errors = await validate(medicineType);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      medicineType.slug = slugify(req.body.title);
      const update = await this.medicineTypeService
        .update(req.params.id, medicineType)
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = { result: update };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Delete("delete/:id")
  @Middleware([checkJwt])
  private async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const del = await this.medicineTypeService
        .delete(req.params.id)
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = { result: del };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
