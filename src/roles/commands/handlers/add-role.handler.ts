import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRoleCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { Role } from 'roles/models';
import { Permission } from 'permissions/models';

@Injectable()
@CommandHandler(AddRoleCommand)
export class AddRoleHandler implements ICommandHandler<AddRoleCommand> {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddRoleCommand): Promise<Role> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('AddRoleCommand...'));
    const { roleName, roleEnabled, rolePermissions } = command;
    const role: Role = await this.repository.findOne({
      name: roleName,
    });
    if (!role) {
      const permissions: Permission[] = await this.repository.findByIds(
        rolePermissions,
      );
      const newRole = {
        ...role,
        name: roleName,
        enabled: roleEnabled,
        permissions,
      };
      console.log('role', newRole);
      return this.publisher.mergeObjectContext(
        await this.repository.save(newRole),
      );
    } else {
      console.log(clc.red.bold(`role ${role} already exists`));
      return null;
    }
  }
}
