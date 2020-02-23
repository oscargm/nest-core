import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetUserByIdQuery } from '../implementations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/models';

@Injectable()
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    console.log(
      clc.yellowBright('Async GetUserByIdQuery...', JSON.stringify(query)),
    );
    return this.repository.findOne(query.userId);
  }
}
