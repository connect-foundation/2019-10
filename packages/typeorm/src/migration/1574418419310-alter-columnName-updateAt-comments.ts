import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnNameUpdateAtComments1574418419310
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('comments', 'updateAt', 'updatedAt');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('comments', 'updatedAt', 'updateAt');
  }
}
