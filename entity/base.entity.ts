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
  private _createdAt: string;

  get createdAt(): string {
    return this._createdAt;
  }

  @Column({
    name: 'updatedAt',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  private _updatedAt: string;

  get updatedAt(): string {
    return this._updatedAt;
  }

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: false,
    default: Status.active,
  })
  public status: Status;
}
