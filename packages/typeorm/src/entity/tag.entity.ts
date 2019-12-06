import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { Base } from './base.entity';
import { Video } from './video.entity';

@Entity({
  name: 'tags',
})
export class Tag extends Base {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 45,
    unique: true,
  })
  public name: string;

  @Column({
    name: 'videosCount',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public videosCount: number;

  @ManyToMany(
    type => Video,
    video => video.tags,
  )
  @JoinTable({
    name: 'tagged_videos',
    joinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'videoId',
      referencedColumnName: 'id',
    },
  })
  public videos: Video[];
}
