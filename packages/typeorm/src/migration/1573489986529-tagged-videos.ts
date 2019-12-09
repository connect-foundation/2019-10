import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { Status } from '../../../server/src/entity/custom-type';

export class taggedVideos1573489986529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'tagged_videos',
        columns: [
          {
            name: 'videoId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'tagId',
            type: 'int',
            isNullable: false,
            default: Status.active,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('tagged_videos', [
      new TableForeignKey({
        columnNames: ['videoId'],
        referencedTableName: 'videos',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['tagId'],
        referencedTableName: 'tags',
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const taggedVideos = await queryRunner.getTable('tagged_videos');
    const videoId = taggedVideos.foreignKeys.find(
      fk => fk.columnNames.indexOf('videoId') !== -1,
    );
    const tagId = taggedVideos.foreignKeys.find(
      fk => fk.columnNames.indexOf('tagId') !== -1,
    );

    await queryRunner.dropForeignKeys('tagged_videos', [tagId]);
    await queryRunner.dropForeignKeys('tagged_videos', [videoId]);
    await queryRunner.dropTable('tagged_videos', true, true);
  }
}
