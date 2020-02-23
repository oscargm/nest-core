import { Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(2)' })
  creationTimestamp: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(2)',
    onUpdate: 'CURRENT_TIMESTAMP(2)',
  })
  editionTimestamp: Date;
}
