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
    private readonly roleRepository: Repository<Role>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddRoleCommand): Promise<Role> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('AddRoleCommand...'));
    const { roleName, roleEnabled, rolePermissions } = command;
    const role: Role = await this.roleRepository.findOne({
      name: roleName,
    });
    console.log('rolePermissions.length', rolePermissions.length);
    if (!role) {
      const permissions: Permission[] = [];

      if (rolePermissions.length > 0) {
        // TODO: find provider configuration to access to permissions
        // permissions.push(
        //   ...(await this.permissionProvider.findByIds(rolePermissions)),
        // );
      }
      console.log('permissions', JSON.stringify(permissions));
      const newRole = {
        ...role,
        name: roleName,
        enabled: roleEnabled,
        permissions,
      };
      console.log('role', newRole);
      return this.publisher.mergeObjectContext(
        await this.roleRepository.save(newRole),
      );
    } else {
      console.log(clc.red.bold(`role ${role} already exists`));
      return null;
    }
  }
}
