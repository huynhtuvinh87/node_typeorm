import { NextFunction, Request, Response } from "express";
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Middleware,
} from "@overnightjs/core";
import { AnswerService } from "../../services/question/AnswerService";
import { Answer } from "../../entities/question/Answer";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/answer")
export class AnswerController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly answerService: AnswerService) {}

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
      const question = req.query.question ? Number(req.query.question) : null;
      const [result, total] = await this.answerService.getData(
        skip,
        take,
        question
      );

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
      const question = req.query.question ? Number(req.query.question) : null;
      const [result, total] = await this.answerService.getData(
        skip,
        take,
        question
      );

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
      const answer: Answer = <Answer>req.body;
      const errors = await validate(answer);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      answer.user = res.locals.jwtPayload["uuid"];
      answer.question = req.body.question;
      const result = await this.answerService.store(answer).catch((e) => {
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
      const answer: Answer = <Answer>req.body;
      const errors = await validate(answer);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      const result = await this.answerService
        .update(req.params.id, answer)
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
      const del = await this.answerService
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
