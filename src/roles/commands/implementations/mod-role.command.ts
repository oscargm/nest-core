import { AddRoleCommand } from './add-role.command';

export class ModRoleCommand extends AddRoleCommand {
  constructor(
    public readonly roleId: number,
    public readonly roleName: string,
    public readonly roleEnabled: boolean,
    public readonly rolePermissions?: number[],
  ) {
    super(roleName, roleEnabled, rolePermissions);
  }
}
