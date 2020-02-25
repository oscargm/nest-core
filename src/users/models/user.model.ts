import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractAggregatedEntity } from 'common';
import { Role } from 'roles/models';

@Entity({ name: 'users' })
export class User extends AbstractAggregatedEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  mail: string;

  @Column({ length: 50 })
  password: string;

  @OneToMany(
    type => Role,
    role => role.id,
  )
  roles: Role[];
}
