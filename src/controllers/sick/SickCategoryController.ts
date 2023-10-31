import { NextFunction, Request, Response } from "express";
import {
  Middleware,
  Controller,
  Post,
  Get,
  Put,
  Delete,
} from "@overnightjs/core";
import { SickCategoryService } from "../../services/sick/SickCategoryService";
import { SickCategory } from "../../entities/sick/SickCategory";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { default as slugify } from "slugify";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/sick-category")
export class SickCategoryController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly sickCategoryService: SickCategoryService) {}

  @Get("list")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sickCategory = await this.sickCategoryService
        .index({
          relations: ["sickType"],
          where: req.query.status ? { status: req.query.status } : {},
        })
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = {
        result: sickCategory,
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
      const sickCategory = await this.sickCategoryService
        .index({
          relations: ["sickType"],
          where: req.query.status ? { status: req.query.status } : {},
        })
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = {
        result: sickCategory,
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
      const sickCategory: SickCategory = <SickCategory>req.body;
      const errors = await validate(SickCategory);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      sickCategory.slug = slugify(req.body.title, "-");
      const create = await this.sickCategoryService.store(sickCategory);

      this.dataResponse.data = {
        result: create,
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
      const sickCategory: SickCategory = <SickCategory>req.body;
      const errors = await validate(SickCategory);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      sickCategory.slug = slugify(req.body.title);
      const update = await this.sickCategoryService
        .update(req.params.id, sickCategory)
        .catch((e) => {
          throw e;
        });

      this.dataResponse.data = {
        result: update,
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
      const del = await this.sickCategoryService
        .delete(req.params.id)
        .catch((e) => {
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
