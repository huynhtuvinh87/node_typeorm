import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import Log from '../utils/Log';
import multer from 'multer';
import path from 'path';

export const uploadMiddleware = (fieldName: string, fileSizeLimited: number) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tmpFolderExisted: boolean = fs.existsSync(path.resolve(process.env.UPLOAD_FOLDER));
    if (!tmpFolderExisted) {
      try {
        fs.mkdirSync(path.resolve(process.env.UPLOAD_FOLDER));
      } catch (ex) {
        Log.error('checkUpload.middleware', 'uploadFileMiddleware', null, ex);
      }
    }

    const result: RequestHandler = multer({
      storage: multer.diskStorage({
        destination: process.env.UPLOAD_FOLDER,
        // eslint-disable-next-line
        filename(req, file, callback) {
          callback(null, `${path.basename(Date.now() + file.originalname.replace(/[^\d\w.]/g, '-'))}`);
        }
      }),
      limits: {
        fileSize: 1024 * 1024 * fileSizeLimited
      }
    }).single(fieldName);
    // eslint-disable-next-line
    result(req, res, function (err: any) {
      if (err === undefined) {
        next();
      } else {
        res.status(400).json({
          act: 'upload',
          errCd: err.code,
          msg: err.message
        });
      }
    });
  };
};
