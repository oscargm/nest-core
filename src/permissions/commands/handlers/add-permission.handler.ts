import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPermissionCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { Permission } from 'permissions/models';

@Injectable()
@CommandHandler(AddPermissionCommand)
export class AddPermissionHandler
  implements ICommandHandler<AddPermissionCommand> {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddPermissionCommand): Promise<Permission> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('AddUserCommand...'));
    const { permissionName, permissionEnabled } = command;
    const permission: Permission = await this.repository.findOne({
      name: permissionName,
    });
    if (!permission) {
      const newPermission = {
        ...permission,
        name: permissionName,
        enabled: permissionEnabled,
      };
      console.log('permission', newPermission);
      return this.publisher.mergeObjectContext(
        await this.repository.save(newPermission),
      );
    } else {
      console.log(clc.red.bold(`permission ${permission} already exists`));
      return null;
    }
  }
}
