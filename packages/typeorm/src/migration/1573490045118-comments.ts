import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Status } from '../custom-type';

export class comments1573490045118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (!(await queryRunner.hasTable('comments'))) {
      await queryRunner.createTable(
        new Table({
          name: 'comments',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'content',
              type: 'varchar',
              length: '3000',
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
    if (await queryRunner.hasTable('comments')) {
      await queryRunner.dropTable('comments', true, true);
    }
  }
}
