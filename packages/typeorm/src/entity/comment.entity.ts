import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { Base } from './base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity({
  name: 'comments',
})
export class Comment extends Base {
  @Column({
    name: 'content',
    type: 'varchar',
    length: 3000,
  })
  public content: string;

  @Column({
    name: 'like',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public like: number;

  @OneToMany(
    type => Comment,
    comment => comment.parent,
  )
  public children: Comment[];

  @ManyToOne(
    type => Comment,
    comment => comment.children,
  )
  @JoinColumn({
    name: 'parentId',
    referencedColumnName: 'id',
  })
  public parent: Comment;

  @ManyToOne(
    type => User,
    user => user.comments,
    {
      nullable: false,
    },
  )
  public user: User;

  @ManyToOne(
    type => Video,
    video => video.comments,
    {
      nullable: false,
    },
  )
  public video: Video;
}
