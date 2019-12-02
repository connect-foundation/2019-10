import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Base } from './base.entity';
import { Video } from './video.entity';
import { Comment } from './comment.entity';

@Entity({
  name: 'users',
})
export class User extends Base {
  @Column({
    name: 'username',
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  public username: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1500,
    nullable: false,
  })
  public description: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 2083,
    nullable: false,
  })
  public avatar: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    name: 'githubId',
    type: 'int',
    nullable: false,
    unique: true,
  })
  public githubId: number;

  @Column({
    name: 'videosCount',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public videosCount: number;

  @ManyToMany(
    type => Comment,
    comment => comment.likedUsers,
  )
  @JoinTable({
    name: 'liked_comments',
    joinColumn: {
      name: 'commentId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  public likedComments: Comment[];

  @OneToMany(
    type => Video,
    video => video.user,
  )
  public videos: Video[];

  @ManyToMany(
    type => Video,
    video => video.likedUsers,
  )
  public likedVideos: Video[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  public comments: Comment[];
}
