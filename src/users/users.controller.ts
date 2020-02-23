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
import { AddUserDto, ModUserDto } from './interfaces';
import { AddUserCommand, DelUserCommand, ModUserCommand } from './commands';
import { User } from './models';
import { GetUsersQuery, GetUserByIdQuery } from './queries';

@Controller('user')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async addUser(@Body() dto: AddUserDto) {
    console.log('addUser', dto);
    return this.commandBus.execute(
      new AddUserCommand(dto.username, dto.userMail, dto.userPass),
    );
  }

  @Patch(':id')
  async modUser(@Param('id') id: string, @Body() dto: ModUserDto) {
    return this.commandBus.execute(
      new ModUserCommand(
        parseInt(id, 10),
        dto.username,
        dto.userMail,
        dto.userPass,
      ),
    );
  }

  @Delete(':id')
  async delUser(@Param('id') id: string) {
    return this.commandBus.execute(new DelUserCommand(parseInt(id, 10)));
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User[]> {
    return this.queryBus.execute(new GetUserByIdQuery(parseInt(id, 10)));
  }
}
