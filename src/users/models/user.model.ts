import { Entity, Column } from 'typeorm';
import { AbstractAggregatedEntity } from 'common';

@Entity({ name: 'users' })
export class User extends AbstractAggregatedEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  mail: string;

  @Column({ length: 50 })
  password: string;
}
