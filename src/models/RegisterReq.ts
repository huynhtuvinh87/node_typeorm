export interface RegisterReq {
  username: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  password: string;
  code: string;
  device_token: string;
  address: object;
  office: object;
  doctor: object;
  phamarcy: object;
}
