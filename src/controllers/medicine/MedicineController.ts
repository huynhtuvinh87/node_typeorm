import { NextFunction, Request, Response } from "express";
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Middleware,
} from "@overnightjs/core";
import { MedicineService } from "../../services/medicine/index";
import { Medicine } from "../../entities/medicine/Medicine";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { default as slugify } from "slugify";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/medicine")
export class MedicineController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly medicineService: MedicineService) {}
  @Get("list")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const take = Number(req.body.take) ?? 10;
      const skip = Number(req.query.skip) ?? 0;
      const category = req.query.category ?? null;

      const [result, total] = await this.medicineService
        .paginate({
          select: ["id", "title", "description", "content", "status"],
          relations: ["medicineCategory"],
          where: category ? { medicineCategory: category } : {},
          skip: skip,
          take: take,
        })
        .catch((e) => {
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

  @Get("app/list")
  private async appList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const take = Number(req.body.take) ?? 10;
      const skip = Number(req.query.skip) ?? 0;
      const category = req.query.category ?? null;

      const [result, total] = await this.medicineService
        .paginate({
          select: ["id", "title", "description", "content", "status"],
          relations: ["medicineCategory"],
          where: category ? { medicineCategory: category } : {},
          skip: skip,
          take: take,
        })
        .catch((e) => {
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

  @Post("create")
  @Middleware([checkJwt])
  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicine: Medicine = <Medicine>req.body;
      const errors = await validate(medicine);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
        return;
      }
      medicine.slug = slugify(req.body.title, "-");

      const result = await this.medicineService.store(medicine).catch((e) => {
        throw e;
      });

      this.dataResponse.data = { result: result };
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
      const medicine: Medicine = <Medicine>req.body;
      const errors = await validate(medicine);
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      medicine.slug = slugify(req.body.title, "-");
      const result = await this.medicineService
        .update(req.params.id, medicine)
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = { result: result };
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
      const del = await this.medicineService
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
