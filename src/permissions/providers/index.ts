import { Permission } from 'permissions/models';
import * as clc from 'cli-color';
import { getRepository, In } from 'typeorm';

const getAll = async (): Promise<Permission[]> => {
  console.log(clc.yellowBright('Permission Provider - getAll'));
  return getRepository(Permission).find();
};

const getOne = async (permissionId: number): Promise<Permission> => {
  console.log(clc.yellowBright('Permission Provider - getOne'));
  return getRepository(Permission).findOne({ where: { id: permissionId } });
};

const getMany = async (permissionIds: number[]): Promise<Permission[]> => {
  console.log(clc.yellowBright('Permission Provider - getOne'));
  return getRepository(Permission).find({ where: { id: In(permissionIds) } });
};

export const permissionProviders = { getAll, getOne, getMany };
