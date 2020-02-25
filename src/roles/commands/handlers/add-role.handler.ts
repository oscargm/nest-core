import {
  ICommandHandler,
  EventPublisher,
  CommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRoleCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { Role } from 'roles/models';
import { Permission } from 'permissions/models';
import { PermissionsController } from 'permissions/permissions.controller';
import { permissionProviders } from 'permissions/providers';
import { GetPermissionsHandler } from 'permissions/queries/handlers/get-permissions.handler';

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
    if (!role) {
      const permissions = await permissionProviders.getMany(rolePermissions);
      let newRole = new Role();
      newRole.name = roleName;
      newRole.enabled = roleEnabled;
      newRole.permissions = permissions;
      // return this.publisher.mergeObjectContext(
      await await this.roleRepository.create(newRole);
      // );
    } else {
      console.log(clc.red.bold(`role ${role} already exists`));
      return null;
    }
  }
}
