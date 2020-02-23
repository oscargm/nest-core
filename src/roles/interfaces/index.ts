export interface AddRoleDto {
  name: string;
  enabled: boolean;
  permissions?: number[];
}

export interface ModRoleDto extends AddRoleDto {}
