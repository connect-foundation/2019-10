import { MigrationInterface, TableColumn, QueryRunner } from 'typeorm';

export class addVideosCountColumnUsers1574410113562
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'videosCount',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'videosCount');
  }
}
