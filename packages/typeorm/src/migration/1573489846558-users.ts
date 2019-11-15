import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Status } from '../custom-type';

export class users1573489846558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (!(await queryRunner.hasTable('users'))) {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              isPrimary: true,
              type: 'int',
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'username',
              type: 'varchar',
              length: '30',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'description',
              type: 'varchar',
              length: '3000',
              isNullable: false,
            },
            {
              name: 'avatar',
              type: 'varchar',
              length: '2083',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              length: '100',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'githubId',
              type: 'varchar',
              length: '40',
              isNullable: false,
              isUnique: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable('users')) {
      await queryRunner.dropTable('users', true, true);
    }
  }
}
