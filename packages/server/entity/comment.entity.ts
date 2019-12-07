import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Base } from './base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

const popularityWeight = {
  childrenCount: 4,
  likedUsersCount: 1,
};

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
    name: 'likedUsersCount',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public likedUsersCount: number;

  @Column({
    name: 'childrenCount',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public childrenCount: number;

  @Column({
    name: 'popularity',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public popularity: number;

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
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  public user: User;

  @ManyToOne(
    type => Video,
    video => video.comments,
    {
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'videoId',
    referencedColumnName: 'id',
  })
  public video: Video;

  @ManyToMany(
    type => User,
    user => user.likedComments,
  )
  public likedUsers: User[];

  @OneToMany(
    type => Comment,
    comment => comment.parent,
  )
  public children: Comment[];

  @BeforeUpdate()
  public updatePopularity() {
    this.popularity =
      this.childrenCount * popularityWeight.childrenCount +
      this.likedUsersCount * popularityWeight.likedUsersCount;
  }
}
