import { AddUserCommand } from './add-user.command';

export class ModUserCommand extends AddUserCommand {
  constructor(
    public readonly userId: number,
    public readonly username: string,
    public readonly userMail: string,
    public readonly userPass: string,
  ) {
    super(username, userMail, userPass);
  }
}
