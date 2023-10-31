import { NextFunction, Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';
import { BaseResponse } from '../../services/BaseResponse';
import Log from '../../utils/Log';
import { NewPassworEmaildReq } from '../../models/NewPasswordEmailReq';

var nodemailler = require('nodemailer');
const option = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
}

var transporter = nodemailler.createTransport(option);

@Service()
@Controller('api')
export class ForgotController {

  constructor(private readonly userService: UserService) { }
  private className = 'ForgotController';
  private dataResponse: BaseResponse = new BaseResponse();

  @Post('forgot-password')
  private async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'forgotPassword', `RQ`, { req: req });

    console.log()
    try {
      let user: User
      if (req.body.username) {
        user = await this.userService.findByUserName(req.body.username).catch((e) => {
          throw e;
        });
      }

      if (req.body.email) {
        user = await this.userService.findByEmail(req.body.email).catch((e) => {
          throw e;
        });
      }
      if (req.body.phone) {
        user = await this.userService.findByPhone(req.body.phone).catch((e) => {
          throw e;
        });
      }

      if (!user) {
        this.dataResponse.status = 422;
        this.dataResponse.error = 1005;
        this.dataResponse.data = {};
        this.dataResponse.message = 'Tài khoản này không tồn tại trong hệ thống'
        res.status(422).json(this.dataResponse);
      }

      var codeRan = Math.floor(1000 + Math.random() * 9000);
      user.code = codeRan.toString();
      await user.save();

      try {
        transporter.verify(function (err: any, success: any) {
          if (err) {
            console.log(err);
          } else {
            var mail = {
              from: process.env.EMAIL,
              to: user.email.toString(),
              subject: 'Verify your Y Khoa ID email address',
              text: teamplateVerfification(user.name, user.code),
            };
            transporter.sendMail(mail, function (err: any, info: any) {

            });
          }
        });
      } catch (e) {
      }

      this.dataResponse.success = true;
      this.dataResponse.status = 200;
      this.dataResponse.error = 0;
      this.dataResponse.data = {};
      res.status(200).json(this.dataResponse);

    } catch (e) {
      next(e);
    }
  }

  @Post('new-password')
  private async newPassword(req: Request, res: Response, next: NextFunction): Promise<void> {

    console.log(req.body)

    try {
      let data: NewPassworEmaildReq = req.body;
      console.log(req.body)
      let user: User = await this.userService.findByEmail(data.email).catch((e) => {
        throw e;
      });

      if (user == null) {
        this.dataResponse.success = false;
        this.dataResponse.status = 422;
        this.dataResponse.error = 1005;
        this.dataResponse.data = {};
        this.dataResponse.message = 'Tài khoản chưa tồn tại !'
        res.status(422).json(this.dataResponse);
      }
      console.log(data.code)
      console.log(user.code)
      if (user.code !== data.code) {
        this.dataResponse.success = false;
        this.dataResponse.status = 422;
        this.dataResponse.error = 1005;
        this.dataResponse.data = {};
        this.dataResponse.message = 'Không trùng khớp mã code. Vui lòng vào Email để có được mã code'
        res.status(422).json(this.dataResponse);
      }

      if (data.new_password !== data.confirm_password) {
        this.dataResponse.success = false;
        this.dataResponse.status = 422;
        this.dataResponse.error = 1005;
        this.dataResponse.data = {};
        this.dataResponse.message = 'Hai Mật khẩu không trùng khớp'
        res.status(422).json(this.dataResponse);
      }

      var salt = bcrypt.genSaltSync(8);
      const new_password = bcrypt.hashSync(req.body.new_password, salt);
      user.password = new_password
      await user.save()

      this.dataResponse.success = true
      this.dataResponse.status = 200;
      this.dataResponse.error = 0;
      this.dataResponse.data = {};
      this.dataResponse.message = 'Thay đổi mật khẩu thành công'
      res.status(200).json(this.dataResponse);

    } catch (e) {
      next(e);
    }
  }

}


export default function teamplateVerfification(fullName: string, code: string): string {
  return ` Hi  ${fullName} \n\t`

    + `\n Your verification code is  ${code} \n\t`

    + '\n Enter this code in our [Y KHOA] to activate your account.\n\t '

    + '\n Click here [open code in app] to open the [app/portal landing page].\n\t '

    + '\n If you have any questions, send us an email [serveruits@gmail.com to your support team].\n\t '

    + '\n We’re glad you’re here! \n\t '
    + '\n The [Y KHOA] team \n\t ';
}

