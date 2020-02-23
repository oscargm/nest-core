import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { DelUserCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from 'users/models';

@Injectable()
@CommandHandler(DelUserCommand)
export class DelUserHandler implements ICommandHandler<DelUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DelUserCommand): Promise<DeleteResult> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('DelUserCommand...'));
    const { userId } = command;
    const user = await this.repository.findOne(userId);
    if (user) {
      return await this.repository.delete(userId);
    } else {
      console.log(clc.red.bold(`user ${userId} does not exists`));
      return null;
    }
  }
}
