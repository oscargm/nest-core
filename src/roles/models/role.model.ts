import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { AbstractAggregatedEntity } from 'common';
import { Permission } from 'permissions/models';

@Entity({ name: 'roles' })
export class Role extends AbstractAggregatedEntity {
  @Column({ default: '', length: 50 })
  name: string;

  @Column({ default: false })
  enabled: boolean;

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];
}
