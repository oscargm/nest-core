import { Entity, Column } from 'typeorm';
import { AbstractAggregatedEntity } from 'common';
import { Role } from 'roles/models';

@Entity({ name: 'permissions' })
export class Permission extends AbstractAggregatedEntity {
  @Column({ default: '', length: 50 })
  name: string;

  @Column({ default: false })
  enabled: boolean;
}
