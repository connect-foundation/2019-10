import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import { Status } from '../custom-type';

export abstract class Base {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  public id: number;

  @Column({
    name: 'createdAt',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  private mCreatedAt: string;

  get createdAt(): string {
    return this.mCreatedAt;
  }

  @Column({
    name: 'updatedAt',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  private mUpdatedAt: string;

  get updatedAt(): string {
    return this.mUpdatedAt;
  }

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: false,
    default: Status.active,
  })
  public status: Status;
}
