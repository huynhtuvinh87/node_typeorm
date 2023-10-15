import { NextFunction, Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';

@Service()
@Controller('api')
export class ForgotController {
  constructor(
    private readonly userService: UserService) { }
  @Post('forgot-ppassword')
  private async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let user = await this.userService.findByUserName(req.body.username).catch((e) => {
        throw e;
      });
      if (req.body.username) {
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
        res.status(422).json({ data: 'Tài khoản này không tồn tại trong hệ thống' })
      }
      var codeRan = Math.floor(1000 + Math.random() * 9000);
      user.code = codeRan.toString();
      await user.save();

      res.status(200).json({ data: user.code });
    } catch (e) {
      next(e);
    }
  }

  @Post('new-password')
  private async newPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await this.userService.findByUserName(req.body.username).catch((e) => {
        throw e;
      });
      if (!user || user.code !== req.body.code) {
        res.status(422).json({ data: 'Tài khoản này không tồn tại trong hệ thống' })
      }

      if (req.body.new_password !== req.body.confirm_password) {
        res.status(422).json({ message: "Hai password không trùng" });
      }
      var salt = bcrypt.genSaltSync(8);
      const new_password = bcrypt.hashSync(req.body.new_password, salt);
      user.password = new_password
      user.save()

      res.status(200).json({ data: 'Thay đổi mật khẩu thành công' });
    } catch (e) {
      next(e);
    }
  }

}


