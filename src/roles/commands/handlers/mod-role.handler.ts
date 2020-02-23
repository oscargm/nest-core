import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ModRoleCommand } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'roles/models';
import { Permission } from 'permissions/models';

@Injectable()
@CommandHandler(ModRoleCommand)
export class ModUserHandler implements ICommandHandler<ModRoleCommand> {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ModRoleCommand): Promise<Role> {
    // TODO: Constrain log to development only !!!
    console.log(clc.greenBright('ModRoleCommand...', JSON.stringify(command)));
    const { roleId, roleName, roleEnabled, rolePermissions } = command;
    const role: Role = await this.repository.findOne(roleId);
    if (role) {
      const permissions: Permission[] = [];
      if (rolePermissions.length > 0) {
        // TODO: find provider configuration to access to permissions
        // permissions.push(
        //   ...(await this.repository.findByIds(
        //     rolePermissions,
        //   )),
        // );
      }
      role.name = roleName;
      role.enabled = roleEnabled;
      role.permissions = permissions;
      return this.publisher.mergeObjectContext(
        await this.repository.save(role),
      );
    } else {
      console.log(clc.red.bold(`role ${roleId} does not exists`));
      return null;
    }
  }
}
