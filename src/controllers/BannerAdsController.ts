import { NextFunction, Request, Response } from "express";
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Middleware,
} from "@overnightjs/core";
import { BannerAdsService } from "../services/BannerAdsService";
import { BannerAds } from "../entities/BannerAds";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../middleware/checkJwt.middleware";
import { BaseResponse } from "../services/BaseResponse";
@Service()
@Controller("api/banner-ads")
export class BannerAdsController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly bannerAdsService: BannerAdsService) {}
  @Get("list")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const take = req.query.take ? Number(req.query.take) : 10;
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const type = Number(req.query.type) ?? null;
      const [result, total] = await this.bannerAdsService
        .paginate({
          select: [
            "id",
            "order",
            "title",
            "description",
            "photo",
            "type",
            "link",
            "status",
            "createdAt",
          ],
          where: type ? { type: type } : {},
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
      const take = req.query.take ? Number(req.query.take) : 10;
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const type = Number(req.query.type) ?? null;
      const [result, total] = await this.bannerAdsService
        .paginate({
          select: [
            "id",
            "order",
            "title",
            "description",
            "photo",
            "type",
            "link",
            "status",
            "createdAt",
          ],
          where: type ? { type: type } : {},
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
      const bannerAds: BannerAds = <BannerAds>req.body;

      const errors = await validate(bannerAds);
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      const result = await this.bannerAdsService.store(bannerAds).catch((e) => {
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
      const bannerAds: BannerAds = <BannerAds>req.body;
      const errors = await validate(bannerAds);
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      const result = await this.bannerAdsService
        .update(req.params.id, bannerAds)
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
      const result = await this.bannerAdsService
        .delete(req.params.id)
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
}
