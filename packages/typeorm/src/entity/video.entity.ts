import {
  Entity,
  Column,
  Timestamp,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Base } from './base.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

const popularityWeight = {
  views: 1,
  likedUsersCount: 2,
  commentsCount: 4,
};

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
    name: 'likedUsersCount',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public likedUsersCount: number;

  @Column({
    name: 'views',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public views: number;

  @Column({
    name: 'source',
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
    type: 'int',
    nullable: false,
  })
  public playtime: Timestamp;

  @Column({
    name: 'commentsCount',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public commentsCount: number;

  @Column({
    name: 'popularity',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public popularity: number;

  @ManyToOne(
    type => User,
    user => user.videos,
    {
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
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

  @BeforeInsert()
  @BeforeUpdate()
  public updatePopularity() {
    if (!this.popularity) {
      return;
    }

    this.popularity =
      this.likedUsersCount * popularityWeight.likedUsersCount +
      this.views * popularityWeight.views +
      this.commentsCount * popularityWeight.commentsCount;
  }
}
