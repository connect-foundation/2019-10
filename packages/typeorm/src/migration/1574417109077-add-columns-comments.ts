import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnsComments1574417109077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('comments', [
      new TableColumn({
        name: 'likedUsersCount',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'childrenCount',
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
    await queryRunner.dropColumn('comments', 'likedUsersCount');
    await queryRunner.dropColumn('comments', 'childrenCount');
    await queryRunner.dropColumn('comments', 'popularity');
  }
}
