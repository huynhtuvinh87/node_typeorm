import { NextFunction, Request, Response } from "express";
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Middleware,
} from "@overnightjs/core";
import { SickService } from "../../services/sick/SickService";
import { Sick } from "../../entities/sick/Sick";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { default as slugify } from "slugify";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/sick")
export class SickController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly sickService: SickService) {}

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

      const [result, total] = await this.sickService
        .paginate({
          select: ["id", "title", "description", "content", "gender", "status"],
          relations: ["sickCategory"],
          where: category ? { sickCategory: category } : {},
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

      const [result, total] = await this.sickService
        .paginate({
          select: ["id", "title", "description", "content", "gender", "status"],
          relations: ["sickCategory"],
          where: category ? { sickCategory: category } : {},
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
      const sick: Sick = <Sick>req.body;
      const errors = await validate(sick);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
        return;
      }
      sick.slug = slugify(req.body.title, "-");
      sick.sickCategory = req.body.sickCategory;

      const result = await this.sickService.store(sick).catch((e) => {
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

  @Put("update/:id")
  @Middleware([checkJwt])
  private async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sick: Sick = <Sick>req.body;
      const errors = await validate(sick);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
        return;
      }
      sick.slug = slugify(req.body.title, "-");
      const result = await this.sickService
        .update(req.params.id, sick)
        .catch((e) => {
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

  @Delete("delete/:id")
  @Middleware([checkJwt])
  private async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const del = await this.sickService.delete(req.params.id).catch((e) => {
        throw e;
      });

      this.dataResponse.data = {
        result: del,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
}
