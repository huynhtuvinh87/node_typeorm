import { NextFunction, Request, Response } from "express";
import {
  Middleware,
  Controller,
  Post,
  Get,
  Put,
  Delete,
} from "@overnightjs/core";
import { CommentService } from "../../services/user/CommentService";
import { Comment } from "../../entities/Comment";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/comment")
export class CommentController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly commentService: CommentService) {}

  @Get("list")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const take = 10;
      const skip = req.body.skip ?? 0;
      const user = req.body.user ?? "";

      const [result, total] = await this.commentService
        .paginate({
          where: user ? { user: user } : {},
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
      const comment: Comment = <Comment>req.body;
      const errors = await validate(comment);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      const create = await this.commentService.store(comment).catch((e) => {
        throw e;
      });

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
      const comment: Comment = <Comment>req.body;
      const errors = await validate(Comment);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      const update = await this.commentService
        .update(req.params.id, comment)
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
      const del = await this.commentService.delete(req.params.id).catch((e) => {
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
