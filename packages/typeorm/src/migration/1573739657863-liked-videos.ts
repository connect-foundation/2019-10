import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class likedVideos1573739657863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'liked_videos',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'videoId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('liked_videos', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['videoId'],
        referencedTableName: 'videos',
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('liked_videos', true, true);
  }
}
