import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnsVideos1574416436192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('videos', [
      new TableColumn({
        name: 'commentsCount',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'popularity',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('videos', 'commentsCount');
    await queryRunner.dropColumn('videos', 'popularity');
  }
}
