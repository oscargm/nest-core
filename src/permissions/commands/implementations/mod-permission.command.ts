import { AddPermissionCommand } from './add-permission.command';

export class ModPermissionCommand extends AddPermissionCommand {
  constructor(
    public readonly permissionId: number,
    public readonly permissionName: string,
    public readonly permissionEnabled: boolean,
  ) {
    super(permissionName, permissionEnabled);
  }
}
