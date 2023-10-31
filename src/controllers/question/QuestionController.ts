import { NextFunction, Request, Response } from "express";
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Middleware,
} from "@overnightjs/core";
import { QuestionService } from "../../services/question/QuestionService";
import { Question } from "../../entities/question/Question";
import { Service } from "typedi";
import { validate } from "class-validator";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { BaseResponse } from "../../services/BaseResponse";
@Service()
@Controller("api/question")
export class QuestionController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly questionService: QuestionService) {}
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

      const [result, total] = await this.questionService.getData(skip, take);

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

      const [result, total] = await this.questionService.getData(skip, take);

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
      const question: Question = <Question>req.body;
      const errors = await validate(question);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      question.user = res.locals.jwtPayload["uuid"];
      const result = await this.questionService.store(question).catch((e) => {
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
      const question: Question = <Question>req.body;
      const errors = await validate(question);
      if (errors.length > 0) {
        this.dataResponse.success = false;
        res.status(200).json(this.dataResponse);
      }
      question.user = req.body.user;
      const result = await this.questionService
        .update(req.params.id, question)
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
      const del = await this.questionService
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
