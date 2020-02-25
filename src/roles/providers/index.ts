import { Role } from 'roles/models';
import * as clc from 'cli-color';
import { getRepository, In } from 'typeorm';

const getAll = async (): Promise<Role[]> => {
  console.log(clc.yellowBright('Role Provider - getAll'));
  return getRepository(Role).find();
};

const getOne = async (roleId: number): Promise<Role> => {
  console.log(clc.yellowBright('Role Provider - getOne'));
  return getRepository(Role).findOne({ where: { id: roleId } });
};

const getMany = async (roleIds: number[]): Promise<Role[]> => {
  console.log(clc.yellowBright('Role Provider - getOne'));
  return getRepository(Role).find({ where: { id: In(roleIds) } });
};

export const roleProviders = { getAll, getOne, getMany };
