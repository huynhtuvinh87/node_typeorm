import { NextFunction, Request, Response } from 'express';
import { Controller, Put, Post, Get, Middleware } from '@overnightjs/core';
import { UserService } from '../../services/UserService';
import { User } from '../../entities/auth/User';
import { DoctorService } from '../../services/user/DoctorService';
import { OfficeService } from '../../services/user/OfficeService';
import { PhamarcyService } from '../../services/user/PhamarcyService';
import { Service } from 'typedi';
import { checkJwt } from '../../middleware/checkJwt.middleware';
import { Office, Doctor, Phamarcy } from '../../entities/index';
import * as bcrypt from 'bcryptjs';

@Service()
@Controller('api/profile')
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly officeService: OfficeService,
    private readonly phamacryService: PhamarcyService,
    private readonly doctorService: DoctorService) { }
  @Get('me')
  @Middleware([checkJwt])
  private async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await this.userService.findById(res.locals.jwtPayload.uuid, {
        relations: ['doctor', 'office', 'phamacry']
      }).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  @Get('change-password')
  @Middleware([checkJwt])
  private async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await this.userService.findById(res.locals.jwtPayload.uuid).catch((e) => {
        throw e;
      });
      var salt = bcrypt.genSaltSync(8);
      const new_password = bcrypt.hashSync(req.body.newPass, salt);
      const checkPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!checkPassword) {
        res.status(422).json({ data: 'Password khong chinh xac' })
      }
      if (req.body.new_password !== req.body.confirm_password) {
        res.status(422).json({ data: "Password khong trung" });
      }
      const result = await this.userService.update(req.params.id, { password: new_password }).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  @Post('doctor/:id')
  @Middleware([checkJwt])
  private async updateDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctor = new Doctor
      doctor.about = req.body.about
      doctor.infor_contact = req.body.infor_contact
      doctor.certificate_file = req.body.certificate_file
      doctor.logo = req.body.logo
      doctor.banner_cover = req.body.banner_cover

      const result = await this.doctorService.update(req.params.id, doctor).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  @Put('phamacry/:id')
  @Middleware([checkJwt])
  private async updatePhamacry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const phamacry = new Phamarcy
      phamacry.about = req.body.about
      phamacry.certificate_file = req.body.certificate_file
      phamacry.logo = req.body.logo
      phamacry.banner_cover = req.body.banner_cover
      const result = await this.phamacryService.update(req.params.id, phamacry).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  @Put('office/:id')
  @Middleware([checkJwt])
  private async updateOffice(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const office = new Office
      office.about = req.body.about
      office.infor_contact = req.body.infor_contact
      office.certificate_file = req.body.certificate_file
      office.logo = req.body.logo
      office.banner_cover = req.body.banner_cover
      const result = await this.officeService.update(req.params.id, office).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
}


