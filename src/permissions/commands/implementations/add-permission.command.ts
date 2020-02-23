export class AddPermissionCommand {
  constructor(
    public readonly permissionName: string,
    public readonly permissionEnabled: boolean,
  ) {}
}
