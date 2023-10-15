import { NextFunction, Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { JwtInfo } from '../../models/JwtInfo';

@Service()
@Controller('api')
export class LoginController {
  constructor(private readonly userService: UserService) { }
  @Post('login')
  private async login(req: Request, res: Response, next: NextFunction,): Promise<void> {
    try {
      const user: User = <User>req.body;
      var result: User;
      var message = ''
      if (req.body.username) {
        result = await this.userService.findByUserName(req.body.username)
        message = 'Username validate'
      } else if (req.body.email) {
        result = await this.userService.findByEmail(req.body.email)
        message = 'Email validate'
      } else {
        result = await this.userService.findByPhone(req.body.phone)
        message = 'Phone validate'
      }
      if (!result) {
        res.status(422).json({ data: message })
      }
      const checkPassword = bcrypt.compareSync(req.body.password, result.password);
      if (!checkPassword) {
        res.status(422).json({ data: 'Password khong chinh xac' })
      }

      const jwtInfo: JwtInfo = {
        uuid: result.id,
        usr: result.username,
        role: result.role
      };

      const token = jwt.sign(jwtInfo, <string>process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE });

      res.status(200).json({
        data: {
          result: {
            id: result.id,
            username: result.username,
            fullname: result.name,
            avatar: result.avatar,
            phone: result.phone,
            role: result.role,
          },
          token: token
        }
      });

    } catch (e) {
      next(e);
    }
  }
}


