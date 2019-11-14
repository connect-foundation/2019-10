import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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
  })
  public name: string;

  @ManyToMany(
    type => Video,
    video => video.tags,
  )
  @JoinTable({
    name: 'tagged_videos',
    joinColumn: {
      name: 'videoId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  videos: Video[];
}
