import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

  @Column({ default: false })
  enabled: boolean;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];
}
