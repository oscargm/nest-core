import { AbstractInterface } from 'common';

export interface Permission extends AbstractInterface {
  name: string;
  enabled: boolean;
}

export interface AddPermissionDto {
  name: string;
  enabled: boolean;
}

export interface ModPermissionDto extends AddPermissionDto {}
