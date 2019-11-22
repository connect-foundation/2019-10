import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnNameUpdateAtTags1574418361009
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('tags', 'updateAt', 'updatedAt');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('tags', 'updatedAt', 'updateAt');
  }
}
