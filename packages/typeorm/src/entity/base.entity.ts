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
  protected id: number;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'datetime',
    nullable: false,
  })
  protected createAt: string;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'datetime',
    nullable: false,
  })
  protected updateAt: string;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: false,
    default: Status.active,
  })
  protected status: Status;
}
