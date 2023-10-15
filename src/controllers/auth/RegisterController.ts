import { NextFunction, Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';
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
export class RegisterController {

  constructor(private readonly userService: UserService) { }


  @Post('register')
  private async register(req: Request, res: Response, next: NextFunction,): Promise<void> {
    try {
      const user: User = <User>req.body;
      if (await this.userService.findByUserName(user.username) ||
        await this.userService.findByEmail(user.email)) {
        res.status(422).json({ data: 'Tài khoản đã được đăng ký' })
      }
      var salt = bcrypt.genSaltSync(8);
      user.name = req.body.name
      user.username = req.body.username
      user.email = req.body.email
      user.password = bcrypt.hashSync(req.body.password, salt)
      user.role = req.body.role
      user.device_token = req.body.device_token
      user.code = Math.floor(1000 + Math.random() * 9000).toString();

      const newUser: User = await this.userService.store(user).catch((e) => {
        throw e;
      });

      try {
        transporter.verify(function (err: any, success: any) {
          if (err) {
            console.log(err);
          } else {
            var mail = {
              from: process.env.EMAIL,
              to: newUser.email.toString(),
              subject: 'Verify your Y Khoa ID email address',
              text: teamplateVerfification(newUser.name, newUser.code),
            };

            transporter.sendMail(mail, function (err: any, info: any){

            });
          }
        });
      } catch (e) {

      }
      res.status(200).json({ data: newUser });

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

