import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetPermissionByIdQuery } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'permissions/models';

@Injectable()
@QueryHandler(GetPermissionByIdQuery)
export class GetPermissionByIdHandler
  implements IQueryHandler<GetPermissionByIdQuery> {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(query: GetPermissionByIdQuery): Promise<Permission> {
    console.log(
      clc.yellowBright('GetPermissionByIdQuery...', JSON.stringify(query)),
    );
    return this.repository.findOne(query.permissionId);
  }
}
