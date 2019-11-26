import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnTags1574417456173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'tags',
      new TableColumn({
        name: 'videosCount',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('tags', 'videosCount');
  }
}
