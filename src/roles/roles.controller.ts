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
import { AddRoleCommand, ModRoleCommand, DelRoleCommand } from './commands';
import { GetRolesQuery, GetRoleByIdQuery } from './queries';
import { Role } from './models';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async addRole(@Body() dto: AddRoleDto) {
    return this.commandBus.execute(
      new AddRoleCommand(dto.name, dto.enabled, dto.permissions),
    );
  }

  @Patch(':id')
  async modRole(@Param('id') id: string, @Body() dto: ModRoleDto) {
    return this.commandBus.execute(
      new ModRoleCommand(
        parseInt(id, 10),
        dto.name,
        dto.enabled,
        dto.permissions,
      ),
    );
  }

  @Delete(':id')
  async delRole(@Param('id') id: string) {
    return this.commandBus.execute(new DelRoleCommand(parseInt(id, 10)));
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.queryBus.execute(new GetRolesQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role[]> {
    return this.queryBus.execute(new GetRoleByIdQuery(parseInt(id, 10)));
  }
}
