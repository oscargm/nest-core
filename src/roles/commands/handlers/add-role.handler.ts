import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRoleCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { Role } from 'roles/models';
import { permissionProviders } from 'permissions/providers';

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
      const newRole = new Role();
      newRole.name = roleName;
      newRole.enabled = roleEnabled;
      newRole.permissions = permissions;
      console.log(clc.green.bold('new role', JSON.stringify(newRole)));
      return this.publisher.mergeObjectContext(
        await this.roleRepository.save(newRole),
      );
    } else {
      console.log(clc.red.bold(`role ${role} already exists`));
      return null;
    }
  }
}
