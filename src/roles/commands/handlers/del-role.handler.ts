import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { DelRoleCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Role } from 'roles/models';

@Injectable()
@CommandHandler(DelRoleCommand)
export class DelRoleHandler implements ICommandHandler<DelRoleCommand> {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>, // private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DelRoleCommand): Promise<DeleteResult> {
    // TODO: Constrain log to development only !!!
    console.log(
      clc.greenBright('DelRoleCommand...', JSON.stringify(DelRoleCommand)),
    );
    const { roleId } = command;
    const role = await this.repository.findOne(roleId);
    if (role) {
      return await this.repository.delete(roleId);
    } else {
      console.log(clc.red.bold(`role ${roleId} does not exists`));
      return null;
    }
  }
}
