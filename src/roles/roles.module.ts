import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { Role } from './models';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { PermissionsModule } from 'permissions';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), CqrsModule, PermissionsModule],
  controllers: [RolesController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class RolesModule {}
