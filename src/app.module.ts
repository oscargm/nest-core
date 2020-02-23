import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from './permissions';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PermissionsModule],
})
export class AppModule {}
