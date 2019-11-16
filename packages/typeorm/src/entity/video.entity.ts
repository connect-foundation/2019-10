import {
  Entity,
  Column,
  Timestamp,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { Base } from './base.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity({
  name: 'videos',
})
export class Video extends Base {
  @Column({
    name: 'title',
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  public title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 3000,
    nullable: false,
  })
  public description: string;

  @Column({
    name: 'like',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public like: number;

  @Column({
    name: 'hit',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public hit: number;

  @Column({
    name: 'sourceUrl',
    type: 'varchar',
    length: 2083,
    nullable: false,
  })
  public sourceUrl: string;

  @Column({
    name: 'thumbnail',
    type: 'varchar',
    length: 2083,
    nullable: false,
  })
  public thumbnail: string;

  @Column({
    name: 'playtime',
    type: 'time',
    nullable: false,
  })
  public playtime: Timestamp;

  @ManyToOne(
    type => User,
    user => user.videos,
    {
      nullable: false,
    },
  )
  public user: User;

  @ManyToMany(
    type => Tag,
    tag => tag.videos,
  )
  public tags: Tag[];

  @ManyToMany(
    type => User,
    user => user.likedVideos,
  )
  @JoinTable({
    name: 'liked_videos',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'videoId',
      referencedColumnName: 'id',
    },
  })
  public likedUsers: User[];

  @OneToMany(
    type => Comment,
    comment => comment.video,
  )
  public comments: Comment;
}
