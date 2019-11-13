import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public name: string;

  @Column({
    type: 'int',
    nullable: false,
    unique: false,
  })
  public age: number;
}
