import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetRoleByIdQuery } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'roles/models';

@Injectable()
@QueryHandler(GetRoleByIdQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleByIdQuery> {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(query: GetRoleByIdQuery): Promise<Role> {
    console.log(
      clc.yellowBright('GetRoleByIdHandler...', JSON.stringify(query)),
    );
    return this.repository.findOne(query.roleId);
  }
}
