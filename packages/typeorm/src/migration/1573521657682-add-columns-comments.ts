import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addColumnsComments1573521657682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable('comments')) {
      if (
        !(
          (await queryRunner.hasColumn('comments', 'userId')) ||
          (await queryRunner.hasColumn('comments', 'videoId')) ||
          (await queryRunner.hasColumn('comments', 'parentId'))
        )
      )
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
    }

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

    if (!userId) {
      await queryRunner.createForeignKey(
        'comments',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
        }),
      );
    }

    if (!videoId) {
      await queryRunner.createForeignKey(
        'comments',
        new TableForeignKey({
          columnNames: ['videoId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'videos',
        }),
      );
    }

    if (!parentId) {
      await queryRunner.createForeignKey(
        'comments',
        new TableForeignKey({
          columnNames: ['parentId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'comments',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable('comments')) {
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

      if (userId) await queryRunner.dropForeignKey('comments', userId);
      if (videoId) await queryRunner.dropForeignKey('comments', videoId);
      if (parentId) await queryRunner.dropForeignKey('comments', parentId);

      if (await queryRunner.hasColumn('comments', 'userid'))
        await queryRunner.dropColumn('comments', 'userId');

      if (await queryRunner.hasColumn('comments', 'videoId'))
        await queryRunner.dropColumn('comments', 'videoId');

      if (await queryRunner.hasColumn('comments', 'parentId'))
        await queryRunner.dropColumn('comments', 'parentId');
    }
  }
}
