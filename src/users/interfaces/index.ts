import { AbstractInterface } from 'common';
import { Role } from 'roles/models';

export interface User extends AbstractInterface {
  name: string;
  mail: string;
  password: string;
  roles: Role[];
}

export interface AddUserDto {
  username: string;
  userMail: string;
  userPass: string;
  userRoles: number[];
}

export interface ModUserDto extends AddUserDto {}
