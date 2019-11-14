import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

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
    length: 3000,
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
    type: 'varchar',
    length: 40,
    nullable: false,
    unique: true,
  })
  public githubId: string;

  @OneToMany(
    type => Video,
    video => video.user,
  )
  videos: Video[];

  @ManyToMany(
    type => Video,
    video => video.likedUsers,
  )
  likedVideos: Video[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];
}
