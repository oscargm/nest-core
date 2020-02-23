export interface AddPermissionDto {
  name: string;
  enabled: boolean;
}

export interface ModPermissionDto extends AddPermissionDto {}
