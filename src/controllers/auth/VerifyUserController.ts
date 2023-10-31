import { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post } from '@overnightjs/core';
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { checkRole } from '../../middleware/checkRole.middleware';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { Roles } from '../../consts/Roles';
import { Service } from 'typedi';
import Log from '../../utils/Log';
import { uploadMiddleware } from '../../middleware/upload.middleware';
import { BaseResponse } from '../../services/BaseResponse';
import { JwtInfo } from 'src/models/JwtInfo';
import { env } from 'process';
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
@Controller('api/verify')
export class VerifyUserController {

  private dataResponse: BaseResponse = new BaseResponse();
  private className = 'VerifyUserController';
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @Middleware([uploadMiddleware('file', 10)]) // 10 : file size 
  private async addUser(req: Request, res: Response, next: NextFunction,): Promise<void> {
    Log.info(this.className, 'addUser', `RQ`, { req: req });

    try {

      const user: User = JSON.parse(req.body.jsonData) as User;

      var result: User;
      try {
        console.log('getByUsername');
        result = await this.userService.findByUserName(user.username);
        if (result == null) {
          console.log('getByEmail');
          result = await this.userService.findByEmail(user.email);
        }
        if (result == null) {
          console.log('getByPhone');
          result = await this.userService.findByPhone(user.phone.replace(" ", ""));
        }
      } catch (error) {
        console.log(error);
      }

      if (result != null) {

        this.dataResponse.status = 400;
        this.dataResponse.data = {};
        if (result.username === user.username) {
          this.dataResponse.message = ' Username already exists ';
        } else if (result.phone === user.phone) {
          this.dataResponse.message = ' Phone already exists ';
        } else {
          this.dataResponse.message = ' User already exists ';
        }

        res.status(400).json(this.dataResponse);
        return;
      }

      var val = Math.floor(1000 + Math.random() * 9000);

      // replace 
      user.phone.replace(" ", "");

      var avatar = `${process.env.UPLOAD_FOLDER}/${req.file.filename}`
      user.code = val.toString();
      user.avatar = avatar.toString();

      console.log(val);
      console.log(avatar);

      const newUser: User = await this.userService.store(user).catch((e) => {
        throw e;
      });
      // await result.save();

      try {
        transporter.verify(function (err: any, success: any) {
          if (err) {
            console.log(err);
          } else {
            console.log('Connected successfully');
            var mail = {
              from: process.env.EMAIL,
              to: newUser.email.toString(),
              subject: 'Verify your SOSDriver ID email address',
              text: teamplateVerfification(newUser.name, newUser.code),
            };

            transporter.sendMail(mail, function (err: any, info: any) {
              if (err) {
                console.log(err);
              } else {
                console.log("Mail sent: " + info.response);
              }
            });
          }
        });
      } catch (e) {

      }

      this.dataResponse.status = 200;
      this.dataResponse.data = newUser;
      this.dataResponse.message = 'Register Successfull';

      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('code')
  private async checkCode(req: Request, res: Response, next: NextFunction,): Promise<void> {
    Log.info(this.className, 'addUser', `RQ`, { req: req });

    try {
      const result: User = await this.userService.findByUserName(req.body.username).catch((e) => {
        throw e;
      });

      if (result != null) {
        this.dataResponse.data = {};
        if (result.code !== req.body.code) {
          this.dataResponse.error = 1001;
          this.dataResponse.status = 400;
          this.dataResponse.message = ' Code not math';
          res.status(400).json(this.dataResponse);
        } else {
          this.dataResponse.error = 0;
          this.dataResponse.status = 200;
          result.verifyCode = true;
          await result.save();
          this.dataResponse.message = 'Code Successfull';
          res.status(200).json(this.dataResponse);
        }
        return;
      } else {
        this.dataResponse.error = 1002;
        this.dataResponse.message = ' User already exists ';
      }
      this.dataResponse.data = result;
      res.status(200).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('resend_code')
  private async resendCode(req: Request, res: Response, next: NextFunction,): Promise<void> {
    Log.info(this.className, 'addUser', `RQ`, { req: req });

    try {
      const result: User = await this.userService.findByUserName(req.body.username).catch((e) => {
        throw e;
      });

      if (result != null) {
        var codeRan = Math.floor(1000 + Math.random() * 9000);
        result.code = codeRan.toString();
        await result.save();

        this.dataResponse.status = 200;

        if (result.email !== null) {
          try {
            transporter.verify(function (err: any, success: any) {
              if (err) {
                console.log(err);
              } else {
                console.log('Connected successfully');
                var mail = {
                  from: process.env.EMAIL,
                  to: result.email.toString(),
                  subject: 'Verify your SOSDriver ID email address',
                  text: teamplateVerfification(result.name, result.code),
                };

                transporter.sendMail(mail, function (err: any, info: any) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Mail sent: " + info.response);
                  }
                });

              }
            })
          } catch (e) { }
        }
        this.dataResponse.data = {
          "code": result.code
        }
        this.dataResponse.message = 'Successfull';

        res.status(200).json(this.dataResponse);
        return;
      } else {
        this.dataResponse.message = ' User already exists ';
      }

      this.dataResponse.status = 400;
      this.dataResponse.data = result;
      res.status(400).json(this.dataResponse);
    } catch (e) {
      next(e);
    }
  }

  @Post('change_password')
  @Middleware([checkJwt, checkRole([{ role: Roles.USER },{ role: Roles.DOCTOR }, { role: Roles.OFFICE },{ role: Roles.PHAMACRY }])])
  private async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updateUser', `RQ`, { req: req });
    const jwtInfo = <JwtInfo>res.locals.jwtPayload;
    try {
      console.log(req.body.oldPass);
      console.log(req.body.newPass);
      console.log(req.body.confirmPass);
      console.log(jwtInfo);

      const user: User | undefined = await this.userService.findById(res.locals.jwtPayload['uuid']).catch((err) => {
        throw err;
      });

      if (req.body.oldPass == user.password) {
        user.password = req.body.newPass;
        const newUser: User = await this.userService.update(user.id, user).catch((e) => {
          throw e;
        });

        this.dataResponse.status = 200;
        this.dataResponse.data = newUser;
        this.dataResponse.message = 'Update the successfull';

        res.status(200).json(this.dataResponse);
      } else {
        this.dataResponse.status = 400;
        this.dataResponse.data = {};
        this.dataResponse.error = 101;
        this.dataResponse.message = 'Incorrect the old Password';

        res.status(200).json(this.dataResponse);
      }

    } catch (e) {
      next(e);
    }
  }

  @Put('update')
  @Middleware([checkJwt, checkRole([{ role: Roles.USER },{ role: Roles.DOCTOR }, { role: Roles.OFFICE },{ role: Roles.PHAMACRY }])])
  private async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updateUser', `RQ`, { req: req });

    try {
      console.log(req.body.firstName);
      console.log(req.body.lastName);
      console.log(req.body.phone);
      console.log(req.body.usr);
      console.log(req.body.location);
      const user: User = <User>req.body;
      console.log(user);
      const newUser: User = await this.userService.findById(res.locals.jwtPayload['uuid']).catch((e) => {
        throw e;
      });
      newUser.name = user.name;
      // newUser.lastName = user.lastName;
      newUser.phone = user.phone;
      newUser.address = user.address;

      var result: User;
      try {
          console.log('getByPhone');
          result = await this.userService.findByPhone(user.phone.replace(" ", ""));
        
      } catch (error) {
        console.log(error);
      }

      if (result != null) {

        this.dataResponse.status = 400;
        this.dataResponse.data = {};
        if (result.username === user.username) {
          this.dataResponse.message = ' Username already exists ';
        } else if (result.phone === user.phone) {
          this.dataResponse.message = ' Phone already exists ';
        } else {
          this.dataResponse.message = ' User already exists ';
        }

        res.status(400).json(this.dataResponse);
        return;
      }

      await newUser.save();
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

