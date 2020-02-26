import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ModRoleCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'roles/models';
import { Permission } from 'permissions/models';
import { permissionProviders } from 'permissions/providers';

@Injectable()
@CommandHandler(ModRoleCommand)
export class ModRoleHandler implements ICommandHandler<ModRoleCommand> {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ModRoleCommand): Promise<Role> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('ModRoleCommand...', JSON.stringify(command)));
    const { roleId, roleName, roleEnabled, rolePermissions } = command;
    const role: Role = await this.repository.findOne({ where: { id: roleId } });
    console.log(clc.green.bold('role found', JSON.stringify(role)));
    if (role) {
      let permissions: Permission[] = [];
      if (rolePermissions.length > 0) {
        permissions = await permissionProviders.getMany(rolePermissions);
      }
      role.name = roleName;
      role.enabled = roleEnabled;
      role.permissions = permissions;
      console.log(clc.green.bold('mod role', JSON.stringify(role)));
      return this.publisher.mergeObjectContext(
        await this.repository.save(role),
      );
    } else {
      console.log(clc.red.bold(`role ${roleId} does not exists`));
      return null;
    }
  }
}
