import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { Permission } from './models';
import { CommandHandlers } from './commands';
// import { EventHandlers } from './events';
import { QueryHandlers } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), CqrsModule],
  controllers: [PermissionsController],
  providers: [
    ...CommandHandlers,
    // ...EventHandlers,
    ...QueryHandlers,
    // UserMaintenanceSagas,
  ],
})
export class PermissionsModule {}
