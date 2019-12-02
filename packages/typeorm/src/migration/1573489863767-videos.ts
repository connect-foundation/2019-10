import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Status } from '../custom-type';

export class videos1573489863767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
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
            name: 'likedUsersCount',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'views',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'source',
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
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('videos', true, true);
  }
}
