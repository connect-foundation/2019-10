import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addColumnsVideos1573521518584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable('videos')) {
      if (!(await queryRunner.hasColumn('videos', 'userId'))) {
        await queryRunner.addColumn(
          'videos',
          new TableColumn({
            name: 'userId',
            type: 'int',
            isNullable: false,
          }),
        );
      }

      const videos = await queryRunner.getTable('videos');
      const uploader = videos.foreignKeys.find(
        fk => fk.columnNames.indexOf('userId') !== -1,
      );

      if (!uploader) {
        await queryRunner.createForeignKey(
          'videos',
          new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          }),
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable('videos')) {
      const videos = await queryRunner.getTable('videos');
      const uploader = videos.foreignKeys.find(
        fk => fk.columnNames.indexOf('userId') !== -1,
      );

      if (uploader) {
        await queryRunner.dropForeignKey('videos', uploader);
      }

      if (await queryRunner.hasColumn('videos', 'userId')) {
        await queryRunner.dropColumn('videos', 'userId');
      }
    }
  }
}
