import { AddRoleCommand } from './add-role.command';

export class ModPermissionCommand extends AddRoleCommand {
  constructor(
    public readonly permissionId: number,
    public readonly roleName: string,
    public readonly roleEnabled: boolean,
  ) {
    super(roleName, roleEnabled);
  }
}
