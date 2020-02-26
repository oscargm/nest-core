import { Module } from '@nestjs/common';
import { UsersModule } from 'users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from 'permissions';
import { RolesModule } from 'roles';
import { AuthModule } from './auth/auth.module';
import { AppController } from 'app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    PermissionsModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
