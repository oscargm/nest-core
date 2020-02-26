import { AbstractInterface } from 'common';
import { Role } from 'roles/models';

export interface User extends AbstractInterface {
  name: string;
  mail: string;
  password: string;
  enabled: boolean;
  roles: Role[];
}

export interface AddUserDto {
  name: string;
  mail: string;
  password: string;
  enabled: boolean;
  roles: number[];
}

export interface ModUserDto extends AddUserDto {}
