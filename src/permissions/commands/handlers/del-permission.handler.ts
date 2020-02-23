import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { DelPermissionCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Permission } from 'permissions/models';

@Injectable()
@CommandHandler(DelPermissionCommand)
export class DelPermissionHandler
  implements ICommandHandler<DelPermissionCommand> {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>, // private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DelPermissionCommand): Promise<DeleteResult> {
    // TODO: Constrain log to development only !!!
    console.log(
      clc.greenBright(
        'DelPermissionCommand...',
        JSON.stringify(DelPermissionCommand),
      ),
    );
    const { permissionId } = command;
    const permission = await this.repository.findOne(permissionId);
    if (permission) {
      return await this.repository.delete(permissionId);
    } else {
      console.log(clc.red.bold(`permission ${permissionId} does not exists`));
      return null;
    }
  }
}
