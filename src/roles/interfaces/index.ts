import { AbstractInterface } from 'common';
import { Permission } from 'permissions';

export interface Role extends AbstractInterface {
  name: string;
  enabled: boolean;
  permissions: Permission[];
}

export interface AddRoleDto {
  name: string;
  enabled: boolean;
  permissions?: number[];
}

export interface ModRoleDto extends AddRoleDto {}
