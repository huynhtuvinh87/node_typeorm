import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Log from '../utils/Log';
import { JwtInfo } from '../models/JwtInfo';
import { Session } from '../entities/auth/Session';
import { getRepository } from 'typeorm';
import { BaseResponse } from '../services/BaseResponse';
export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  //Get the jwt token from the head

  let token = <string>req.headers['authorization'];
  const dataResponse = new BaseResponse();
  if (token) {
    const tokenType: string = <string>process.env.TOKEN_TYPE;
    if (tokenType) token = token.substr(tokenType.length + 1);
    const jwtToken: string = <string>process.env.JWT_SECRET;

    try {
      const sessionRepository = getRepository(Session)
      sessionRepository
        .find({payload: token})
        .then((session) => {
          if(session.length === 0){
            dataResponse.message = 'Unauthorized'
            res.status(200).json(dataResponse)
            return
          }
        })
        .catch((error) => {
          dataResponse.message = 'Unauthorized'
          res.status(200).json(dataResponse)
          return
        });
      const jwtPayload: jwt.JwtPayload = <jwt.JwtPayload>jwt.verify(token, jwtToken);

      const jwtInfo: JwtInfo = {
        uuid: jwtPayload.uuid,
        usr: jwtPayload.usr,
        role: jwtPayload.role
      };
      res.locals.jwtPayload = jwtInfo;

    } catch (ex) {
      dataResponse.message = 'Unauthorized'
      res.status(200).json(dataResponse)
      return
    }
  } else {
    dataResponse.message = 'Unauthorized'
    res.status(200).json(dataResponse)
    return
  }
  next();
};
