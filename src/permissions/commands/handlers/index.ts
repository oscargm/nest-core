import { AddPermissionHandler } from './add-permission.handler';
import { ModUserHandler } from './mod-permission.handler';
import { DelPermissionHandler } from './del-permission.handler';

export const CommandHandlers = [
  AddPermissionHandler,
  ModUserHandler,
  DelPermissionHandler,
];
