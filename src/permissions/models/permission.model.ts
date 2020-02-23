import { Entity, Column } from 'typeorm';
import { AbstractAggregatedEntity } from 'common';

@Entity({ name: 'permissions' })
export class Permission extends AbstractAggregatedEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ default: false })
  enabled: boolean;
}
