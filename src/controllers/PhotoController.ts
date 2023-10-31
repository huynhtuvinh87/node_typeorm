import { Request, Response, NextFunction } from "express";
import { Controller, Middleware, Post, Get } from "@overnightjs/core";
import { Service } from "typedi";
import { uploadMiddleware } from "../middleware/upload.middleware";
import { uploadsMiddleware } from "../middleware/uploads.middleware";
import { BaseResponse } from "../services/BaseResponse";
@Service()
@Controller("api/photo")
export class PhotoController {
  private dataResponse: BaseResponse = new BaseResponse();
  @Post("upload")
  @Middleware([uploadMiddleware("file", 10)])
  private async upload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      var image = `${process.env.URL_IMAGE}/${req.file.filename}`;

      this.dataResponse.data = {
        result: image,
      };
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post("uploads")
  @Middleware([uploadsMiddleware("files", 20)])
  private async uploads(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      var files = [].concat(req.files);
      const items = [];
      for (var i = 0; i < files.length; i++) {
        items.push(`${process.env.URL_IMAGE}/${files[i].filename}`);
      }

      this.dataResponse.data = {
        result: items,
      };
    } catch (e) {
      next(e);
    }
  }
}
