import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ModPermissionCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'permissions/models';

@Injectable()
@CommandHandler(ModPermissionCommand)
export class ModUserHandler implements ICommandHandler<ModPermissionCommand> {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ModPermissionCommand): Promise<Permission> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('ModUserCommand...', JSON.stringify(command)));
    const { permissionId, permissionName, permissionEnabled } = command;
    const permission = await this.repository.findOne(permissionId);
    if (permission) {
      permission.id = permissionId;
      permission.name = permissionName;
      permission.enabled = permissionEnabled;
      return this.publisher.mergeObjectContext(
        await this.repository.save(permission),
      );
    } else {
      console.log(clc.red.bold(`permission ${permissionId} does not exists`));
      return null;
    }
  }
}
