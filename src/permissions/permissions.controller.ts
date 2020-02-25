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
import { AddPermissionDto, ModPermissionDto } from './interfaces';
import {
  AddPermissionCommand,
  ModPermissionCommand,
  DelPermissionCommand,
} from './commands';
import { GetPermissionsQuery, GetPermissionByIdQuery } from './queries';
import { Permission } from './models';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async addPermission(@Body() dto: AddPermissionDto) {
    return this.commandBus.execute(
      new AddPermissionCommand(dto.name, dto.enabled),
    );
  }

  @Patch(':id')
  async modPermission(@Param('id') id: string, @Body() dto: ModPermissionDto) {
    return this.commandBus.execute(
      new ModPermissionCommand(parseInt(id, 10), dto.name, dto.enabled),
    );
  }

  @Delete(':id')
  async delPermission(@Param('id') id: string) {
    return this.commandBus.execute(new DelPermissionCommand(parseInt(id, 10)));
  }

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.queryBus.execute(new GetPermissionsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permission[]> {
    return this.queryBus.execute(new GetPermissionByIdQuery(parseInt(id, 10)));
  }
}
