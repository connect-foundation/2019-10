import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addRelationVideos1573521518584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'videos',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'videos',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const videos = await queryRunner.getTable('videos');
    const uploader = videos.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1,
    );

    await queryRunner.dropForeignKey('videos', uploader);
    await queryRunner.dropColumn('videos', 'userId');
  }
}
