export class AddRoleCommand {
  constructor(
    public readonly roleName: string,
    public readonly roleEnabled: boolean,
    public readonly rolePermissions?: number[],
  ) {}
}
