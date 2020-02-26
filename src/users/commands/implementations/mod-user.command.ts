import { AddUserCommand } from './add-user.command';

export class ModUserCommand extends AddUserCommand {
  constructor(
    public readonly userId: number,
    public readonly username: string,
    public readonly userMail: string,
    public readonly userPass: string,
    public readonly userEnabled: boolean,
    public readonly userRoles: number[],
  ) {
    super(username, userMail, userPass, userEnabled, userRoles);
  }
}
