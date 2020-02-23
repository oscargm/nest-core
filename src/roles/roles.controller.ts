import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddRoleDto, ModRoleDto } from './interfaces';
import {
  AddRoleCommand,
  ModPermissionCommand,
  DelPermissionCommand,
} from './commands';
import { GetPermissionsQuery, GetPermissionByIdQuery } from './queries';
import { Role } from './models';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async addPermission(@Body() dto: AddRoleDto) {
    return this.commandBus.execute(
      new AddRoleCommand(dto.name, dto.enabled, dto.permissions),
    );
  }

  @Patch(':id')
  async modPermission(@Param('id') id: string, @Body() dto: ModRoleDto) {
    return this.commandBus.execute(
      new ModPermissionCommand(parseInt(id, 10), dto.name, dto.enabled),
    );
  }

  @Delete(':id')
  async delPermission(@Param('id') id: string) {
    return this.commandBus.execute(new DelPermissionCommand(parseInt(id, 10)));
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.queryBus.execute(new GetPermissionsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role[]> {
    return this.queryBus.execute(new GetPermissionByIdQuery(parseInt(id, 10)));
  }
}
