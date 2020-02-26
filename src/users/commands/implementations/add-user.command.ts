export class AddUserCommand {
  constructor(
    public readonly username: string,
    public readonly userMail: string,
    public readonly userPass: string,
    public readonly userEnabled: boolean,
    public readonly userRoles: number[],
  ) {}
}
