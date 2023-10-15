import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { User } from '../../entities/auth/User';
import { Roles } from '../../consts/Roles';
import { Service } from 'typedi';
import { Geometry, Point } from 'geojson';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getCustomerUsers(): Promise<User[]> {
    return this.createQueryBuilder('q')
      .leftJoinAndSelect("q.address", "address")
      .where('role = :role', { role: Roles.USER })
      .getMany();
  }

  getServiceUser(): Promise<User[]> {
    return this.createQueryBuilder('q')
      .leftJoinAndSelect("q.address", "address")
      .where('role = :role', { role: Roles.USER })
      .getMany();
  }

  getByUsername(usr: string): Promise<User> {
    return this.createQueryBuilder('q')
      .leftJoinAndSelect("q.address", "address")
      .where('username = :username', { username: usr }).getOne();
  }

  getByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('q')
      .leftJoinAndSelect("q.address", "address")
      .where('email = :email', { email: email }).getOne();
  }

  getByPhone(phone: string): Promise<User> {
    return this.createQueryBuilder('q')
      .leftJoinAndSelect("q.address", "address")
      .where('phone = :phone', { phone: phone }).getOne();
  }

  updateNewPassword(username: string, pwd: string): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update(User)
      .set({
        password: pwd,
      })
      .where('username = :username', { username: username }).execute();
  }

  updateCodeUser(username: string, code: string): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update(User)
      .set({
        code: code,
      })
      .where('username = :username', { username: username }).execute();
  }

  updateUser(username: string, name: string, phone: string): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update(User)
      .set({
        name: name,
        phone: phone,
      })
      .where('username = :username', { username: username }).execute();
  }

  getRangeServices(lat: number, long: number, range: number = 1000): Promise<User[]> {
    return this.createQueryBuilder('l')
      .leftJoinAndSelect("l.location", "location")
      .select(['ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance'])
      .where('ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)', { role: Roles.USER })
      .orderBy("distance", "ASC")
      .setParameters({
        // stringify GeoJSON
        origin: JSON.stringify(origin),
        range: range * 1000 //KM conversion
      })
      .getMany();
  }
}
