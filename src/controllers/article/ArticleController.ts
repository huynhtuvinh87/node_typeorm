import { NextFunction, Request, Response } from 'express';
import { Controller, Post, Get, Put, Delete, Middleware } from '@overnightjs/core';
import { ArticleService } from '../../services/blog/index';
import { Article } from '../../entities/blog/Article';
import { Service } from 'typedi';
import { validate } from "class-validator"
import { uploadMiddleware } from '../../middleware/upload.middleware';
import { Like } from "typeorm";
@Service()
@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  // private repo = getRepository(Article);
  @Get('list')
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const take = 2
      const skip = 0
      const keyword= '123'

      const [result, total]= await this.articleService.paginate({
        select: ['id','title','description','content'],
        relations: ['category'],
        where: keyword ? { title: Like(`%${keyword}%`) } : {},
        skip: skip,
        take: take
      }).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result, total: total, skip: skip, take:take });
    } catch (e) {
      next(e);
    }
  }

  @Post('create')
  @Middleware([uploadMiddleware('photo', 50)])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let article = new Article()
      article.title = req.body.title
      article.category = req.body.category
      article.content = req.body.content
      article.description = req.body.description
      article.status = req.body.status === '1' ? true : false

      const errors = await validate(article)
      if (errors.length > 0) {
        res.status(422).json(errors);
      }

      article.photo = `${process.env.UPLOAD_FOLDER}/${req.file.filename}`

      const result = await this.articleService.store(article).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  @Post('update/:id')
  @Middleware([uploadMiddleware('photo', 50)])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let article = new Article()
      article.title = req.body.title
      article.category = req.body.category
      article.content = req.body.content
      article.description = req.body.description
      article.status = req.body.status === '1' ? true : false
      const errors = await validate(article)
      if (errors.length > 0) {
        res.status(422).json(errors);
      }
      if (req.file) {
        article.photo = `${process.env.UPLOAD_FOLDER}/${req.file.filename}`
      }


      const result = await this.articleService.update(req.params.id, article).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  @Delete('delete/:id')
  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const detele = await this.articleService.delete(req.params.id).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: detele });
    } catch (e) {
      next(e);
    }
  }
}
