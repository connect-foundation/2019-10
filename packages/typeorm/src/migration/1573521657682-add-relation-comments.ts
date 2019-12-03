import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addColumnsComments1573521657682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('comments', [
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: false,
      }),
      new TableColumn({
        name: 'videoId',
        type: 'int',
        isNullable: false,
      }),
      new TableColumn({
        name: 'parentId',
        type: 'int',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['videoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'videos',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['parentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const comments = await queryRunner.getTable('comments');
    const userId = comments.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1,
    );
    const videoId = comments.foreignKeys.find(
      fk => fk.columnNames.indexOf('videoId') !== -1,
    );
    const parentId = comments.foreignKeys.find(
      fk => fk.columnNames.indexOf('parentId') !== -1,
    );

    await queryRunner.dropForeignKey('comments', userId);
    await queryRunner.dropForeignKey('comments', videoId);
    await queryRunner.dropForeignKey('comments', parentId);

    await queryRunner.dropColumn('comments', 'userId');
    await queryRunner.dropColumn('comments', 'videoId');
    await queryRunner.dropColumn('comments', 'parentId');
  }
}
