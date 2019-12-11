import { MigrationInterface, TableColumn, QueryRunner } from 'typeorm';

export class addColumnsUsers1574410113562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'videosCount',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'githubAccessToken',
        type: 'varchar',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'videosCount');
  }
}
