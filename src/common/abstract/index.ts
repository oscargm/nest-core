export * from './abstract.interface';
import { AggregateRoot } from '@nestjs/cqrs';
import { applyMixins } from '../utils';
import { AbstractEntity } from './abstract.entity';

export class AbstractAggregatedEntity extends AbstractEntity {
  constructor() {
    super();
  }
}
export interface AbstractAggregatedEntity
  extends AggregateRoot,
    AbstractEntity {}
applyMixins(AbstractAggregatedEntity, [AggregateRoot, AbstractEntity]);
