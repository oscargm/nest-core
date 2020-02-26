import { User } from 'users/models';
import * as clc from 'cli-color';
import { getRepository, In } from 'typeorm';

const getAll = async (): Promise<User[]> => {
  console.log(clc.yellowBright('User Provider - getAll'));
  return getRepository(User).find();
};

const getOne = async (userId: number): Promise<User> => {
  console.log(clc.yellowBright('User Provider - getOne', userId));
  return getRepository(User).findOne({ where: { id: userId } });
};

const getOneBy = async (prop: string, value: any): Promise<User> => {
  console.log(clc.yellowBright('User Provider - getOneBy', prop, value));
  return getRepository(User).findOne({ where: { [prop]: value } });
};

const getMany = async (userIds: number[]): Promise<User[]> => {
  console.log(clc.yellowBright('User Provider - getOne', userIds));
  return getRepository(User).find({ where: { id: In(userIds) } });
};

export const userProviders = { getAll, getOne, getOneBy, getMany };
