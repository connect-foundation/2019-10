import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Status } from '../custom-type';

export class videos1573489863767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (!(await queryRunner.hasTable('videos'))) {
      await queryRunner.createTable(
        new Table({
          name: 'videos',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'title',
              type: 'varchar',
              length: '45',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar',
              length: '3000',
              isNullable: false,
            },
            {
              name: 'like',
              type: 'int',
              isNullable: false,
              default: 0,
            },
            {
              name: 'hit',
              type: 'int',
              isNullable: false,
              default: 0,
            },
            {
              name: 'sourceUrl',
              type: 'varchar',
              length: '2083',
              isNullable: false,
            },
            {
              name: 'thumbnail',
              type: 'varchar',
              length: '2083',
              isNullable: false,
            },
            {
              name: 'playtime',
              type: 'time',
              isNullable: false,
            },
            {
              name: 'createdAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updateAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            },
            {
              name: 'status',
              type: 'tinyint',
              length: '4',
              default: Status.active,
            },
          ],
        }),
        true,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable('videos')) {
      await queryRunner.dropTable('videos', true, true);
    }
  }
}
