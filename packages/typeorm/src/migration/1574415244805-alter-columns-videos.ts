import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnsVideos1574415244805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('videos', 'like', 'likedUsersCount');
    await queryRunner.renameColumn('videos', 'hit', 'views');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('videos', 'likedUsersCount', 'like');
    await queryRunner.renameColumn('videos', 'views', 'hit');
  }
}
