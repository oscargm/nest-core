import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ModUserCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/models';

@Injectable()
@CommandHandler(ModUserCommand)
export class ModUserHandler implements ICommandHandler<ModUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ModUserCommand): Promise<User> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('ModUserCommand...'));
    const { userId, username, userPass, userMail } = command;
    const user = await this.repository.findOne(userId);
    if (user) {
      user.name = username;
      user.mail = userMail;
      user.password = userPass;
      return this.publisher.mergeObjectContext(
        await this.repository.save(user),
      );
    } else {
      console.log(clc.red.bold(`user ${userId} does not exists`));
      return null;
    }
  }
}
