import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { User } from 'users/models';
import { roleProviders } from 'roles/providers';

@Injectable()
@CommandHandler(AddUserCommand)
export class AddUserHandler implements ICommandHandler<AddUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddUserCommand): Promise<User> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('AddUserCommand...'));
    const { username, userPass, userMail, userEnabled, userRoles } = command;
    const user = await this.repository.findOne({ name: username });
    const roles = await roleProviders.getMany(userRoles);
    if (!user) {
      const newUser = {
        ...user,
        name: username,
        mail: userMail,
        password: userPass,
        enabled: userEnabled,
        roles,
      };
      console.log('user', newUser);
      return this.publisher.mergeObjectContext(
        await this.repository.save(newUser),
      );
    } else {
      console.log(clc.red.bold(`user ${username} already exists`));
      return null;
    }
  }
}
