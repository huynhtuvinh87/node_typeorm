import { NextFunction, Request, Response } from 'express';
import { Controller, Put, Post, Get, Middleware } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { DoctorService } from '../../services/user/DoctorService';
import { OfficeService } from '../../services/user/OfficeService';
import { PhamarcyService } from '../../services/user/PhamarcyService';
import { Service } from 'typedi';
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { Office, Doctor, Phamarcy } from '../../entities/index';
import * as bcrypt from 'bcryptjs';
import Log from '../../utils/Log';
import { BaseResponse } from '../../services/BaseResponse';

@Service()
@Controller('api/profile')
export class ProfileController {

  private dataResponse: BaseResponse = new BaseResponse();
  private className = 'ProfileController';

  constructor(
    private readonly userService: UserService,
    private readonly officeService: OfficeService,
    private readonly phamacryService: PhamarcyService,
    private readonly doctorService: DoctorService) { }

  @Get('me')
  @Middleware([checkJwt])
  private async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'addUser', `RQ`, { req: req });
    console.log(res.locals.jwtPayload);
    try {
      const user: User = await this.userService.findById(res.locals.jwtPayload['uuid'], { relations: ['address','doctor','office','phamarcy'] }).catch((e) => {
        throw e;
      });
      this.dataResponse.success = true;
      this.dataResponse.status = 200;
      this.dataResponse.error = 0;
      this.dataResponse.data = user;
      this.dataResponse.message = 'Success';
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('change-password')
  @Middleware([checkJwt])
  private async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await this.userService.findById(res.locals.jwtPayload.uuid).catch((e) => {
        throw e;
      });
      var salt = bcrypt.genSaltSync(8);
      const new_password = bcrypt.hashSync(req.body.newPass, salt);
      const checkPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!checkPassword) {
        res.status(422).json({ data: 'Password khong chinh xac' })
      }
      if (req.body.new_password !== req.body.confirm_password) {
        res.status(422).json({ data: "Password khong trung" });
      }
      const id = res.locals.jwtPayload['uuid'];
      const result = await this.userService.update(id, { password: new_password }).catch((e) => {
        throw e;
      });

      this.dataResponse.success = true;
      this.dataResponse.status = 200;
      this.dataResponse.error = 0;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Success';
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Put('update')
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = <User>req.body;

      const result = await this.userService.update(res.locals.jwtPayload.uuid, user).catch((e) => {
        throw e;
      });
      this.dataResponse.data = result;
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }
  
}


