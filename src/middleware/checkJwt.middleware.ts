import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Log from '../utils/Log';
import { JwtInfo } from '../models/JwtInfo';

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  //Get the jwt token from the head

  const token = <string>req.headers['authorization'];

  if (token) {
    const tokenType: string = <string>process.env.TOKEN_TYPE;
    // if (tokenType) token = token.substr(tokenType.length + 1);
    const jwtToken: string = <string>process.env.JWT_SECRET;

    try {
      const jwtPayload: jwt.JwtPayload = <jwt.JwtPayload>jwt.verify(token, jwtToken);

      const jwtInfo: JwtInfo = {
        uuid: jwtPayload.uuid,
        usr: jwtPayload.usr,
        role: jwtPayload.role
      };
      res.locals.jwtPayload = jwtInfo;

    } catch (ex) {
      res.status(401).json({'message':'unauthorized'});
      Log.error('middleware', 'checkJwt', { jwtPayload: res.locals?.jwtPayload, req: req });
      return;
    }
    next();
  } else {
    res.status(401).json({'message':'unauthorized'});
    Log.error('middleware', 'checkJwt', { jwtPayload: res.locals?.jwtPayload, req: req });
  }
};
