import { Request, Response, NextFunction } from 'express';
import { Controller, Middleware, Post } from '@overnightjs/core';
import Log from '../utils/Log';
import { Service } from 'typedi';
import { uploadMiddleware } from '../middleware/upload.middleware';
import { uploadsMiddleware } from '../middleware/uploads.middleware';
import { JwtInfo } from 'src/models/JwtInfo';
import { checkJwt } from '../middleware/checkJwt.middleware';
import { User } from '@entities/auth/User';
import { UserService } from '../services/UserService';
import { BaseResponse } from '../services/BaseResponse';

@Service()
@Controller('api/upload')
export class UploadController {
  private className = 'UploadController';
  private dataResponse: BaseResponse = new BaseResponse();
  constructor(private readonly userService: UserService) { }


  @Post('avatar')
  @Middleware([checkJwt, uploadMiddleware('file', 10)])
  private async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'upload', `RQ`, { req: req });

    try {
      const jwtInfo = <JwtInfo>res.locals.jwtPayload;

      const user: User | undefined = await this.userService.findById(res.locals.jwtPayload['uuid']).catch((err) => {
        throw err;
      });
      var avatar = `${process.env.UPLOAD_FOLDER}/${req.file.filename}`;
      user.avatar = avatar;
      await user.save();
      this.dataResponse.status = 200;
      this.dataResponse.data = user;
      this.dataResponse.message = 'Login Successfull';
      res.status(200).json(this.dataResponse);

    } catch (e) {
      next(e);
    }
  }

  @Post('photos')
  @Middleware([checkJwt, uploadsMiddleware('files', 20)])
  private async photo(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      var files = [].concat(req.files);
      const items = [];
      for (var i = 0; i < files.length; i++) {
        items.push(`${process.env.UPLOAD_FOLDER}/${files[i].filename}`);
      }

      res.status(200).json({ data: items });
    } catch (e) {
      next(e);
    }
  }
}
