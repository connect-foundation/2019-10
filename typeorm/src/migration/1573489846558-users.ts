import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class users1573489846558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "int",
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "nickname",
            type: "varchar",
            length: "30",
            isNullable: false
          },
          {
            name: "description",
            type: "varchar",
            length: "3000",
            isNullable: false
          },
          {
            name: "profileImage",
            type: "varchar",
            length: "2083",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isNullable: false
          },
          {
            name: "githubId",
            type: "varchar",
            length: "40",
            isNullable: false
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "modifiedAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users", true, true);
  }
}
