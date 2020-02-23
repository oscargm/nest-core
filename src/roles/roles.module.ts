import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { Role } from './models';
import { CommandHandlers } from './commands';
// import { EventHandlers } from './events';
import { QueryHandlers } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), CqrsModule],
  controllers: [RolesController],
  providers: [
    ...CommandHandlers,
    // ...EventHandlers,
    ...QueryHandlers,
    // UserMaintenanceSagas,
  ],
})
export class RolesModule {}
