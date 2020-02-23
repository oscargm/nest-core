import { Module } from '@nestjs/common';
import { UsersModule } from 'users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from 'permissions';
import { RolesModule } from 'roles';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    PermissionsModule,
    RolesModule,
  ],
})
export class AppModule {}
