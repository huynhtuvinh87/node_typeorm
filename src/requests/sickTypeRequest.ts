import { Request, Response, NextFunction } from 'express';
import { Validator } from 'node-input-validator';
export const sickTypeRequest = (req: Request, res: Response, next: NextFunction): void => {
  //Get the jwt token from the head
  const validation = new Validator(req.body, {
    title: 'required',
    key: 'required|integer'
  });

  validation.check().then((matched) => {
    if (!matched) {
      res.status(422).json({
        error: 0,
        data: {},
        status: 422,
        message: "Unprocessable Entity",
        errors: validation.errors
      });
    }
  });

  next();
};
