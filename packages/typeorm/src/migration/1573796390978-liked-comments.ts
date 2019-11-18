import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class likedComments1573796390978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'liked_comments',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'commentId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('liked_comments', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['commentId'],
        referencedTableName: 'comments',
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('liked_comments', true, true);
  }
}
