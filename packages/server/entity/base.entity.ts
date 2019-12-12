import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status } from './custom-type';

export class Base {
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
  private createdAt: string;

  @Column({
    name: 'updatedAt',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  private updatedAt: string;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: false,
    default: Status.active,
  })
  public status: Status;

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
}
