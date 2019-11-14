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
  protected createdAt: string;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'datetime',
    nullable: false,
  })
  protected updatedAt: string;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: false,
    default: Status.active,
  })
  protected status: Status;
}
