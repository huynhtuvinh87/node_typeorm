
import { NextFunction, Request, Response } from "express";
import { Controller, Middleware, Get } from "@overnightjs/core";
import { checkJwt } from "../../middleware/checkJwt.middleware";
import { UserService } from "../../services/UserService";
import { User } from "../../entities/auth/User";
import { Service } from "typedi";
import { Like } from "typeorm";
import { BaseResponse } from "../../services/BaseResponse";
import path from "path";
import fs from "fs";
import { ImportUser } from '../../models/ImportUser'
@Service()
@Controller("api")
export class UserController {
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly userService: UserService) {}

  @Get("users")
  @Middleware([checkJwt])
  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const take = Number(req.query.take) ?? 20;
      const skip = Number(req.query.skip) ?? 0;
      const keyword = req.query.keyword ?? "";

      const [result, total] = await this.userService
        .paginate({
          select: [
            "username",
            "id",
            "phone",
            "email",
            "money",
            "coin_ads",
            "createdAt",
            "address",
            "verifyCode"
          ],
          where: keyword
            ? { name: Like(`%${keyword}%`), role: "user" }
            : { role: "user" },
          relations: ["address"],
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

  @Get("app/users")
  private async appList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const take = 10;
      const skip = req.body.skip ?? 0;
      const keyword = req.body.keyword ?? "";

      const [result, total] = await this.userService
        .paginate({
          select: [
            "username",
            "id",
            "phone",
            "email",
            "money",
            "coin_ads",
            "createdAt",
            "address",
          ],
          where: keyword
            ? { name: Like(`%${keyword}%`), role: "user" }
            : { role: "user" },
          relations: ["address"],
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

  @Get("users/:id")
  @Middleware([checkJwt])
  private async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: User = await this.userService
        .findById(req.params.id)
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

  @Get("user/import")
  private async import(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const u = path.resolve("upload/users.json");
      fs.readFile(u, "utf8", (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          const databases = JSON.parse(data);
          for (var i = 0; i < databases.length; i++) {
            const db = databases[i];
            const user = new ImportUser();
            user.name = db.fullName;
            user.email = db.email;
            user.phone = db.phone;
            user.password = db.password;
            user.username = db.email.split("@")[0];
            user.device_token = "web";
            if (db.activeDoctor === 1) {
              user.doctor = {
                status: false,
              };
              user.role = "doctor";
            } else {
              user.role = "user";
            }
            user.address = {
              address: db.address ?? "address",
              lat: "0000000",
              log: "0000000000",
            };
            const check = this.userService.findByEmail(user.email) || null;
            if (!check) {
              this.userService.store(user).catch((e) => {
                throw e;
              });
            }
          }
        }
      });
      return;
    } catch (e) {
      next(e);
    }
  }
}
