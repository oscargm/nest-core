import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './models';
import { CommandHandlers } from './commands';
// import { EventHandlers } from './events';
import { QueryHandlers } from './queries';
import { PermissionsModule } from 'permissions';
import { RolesModule } from 'roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [UsersController],
  providers: [
    ...CommandHandlers,
    // ...EventHandlers,
    ...QueryHandlers,
    // UserMaintenanceSagas,
  ],
})
export class UsersModule {}
