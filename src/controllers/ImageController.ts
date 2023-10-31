import { Request, Response, NextFunction } from "express";
import { Controller, Get } from "@overnightjs/core";
import { Service } from "typedi";
import path from "path";
@Service()
@Controller("image")
export class ImageController {
  @Get(":name")
  private async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.sendFile(path.resolve("upload/" + req.params.name));
    } catch (e) {
      next(e);
    }
  }
}
