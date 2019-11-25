import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnNameUpdateAtVideos1574418163970
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('videos', 'updateAt', 'updatedAt');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('videos', 'updatedAt', 'updateAt');
  }
}
