import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class tags1573489925976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "tags",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "int",
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar",
            length: "45"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("tags", true, true);
  }
}
