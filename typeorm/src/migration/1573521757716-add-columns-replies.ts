import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn
} from "typeorm";

export class addColumnsReplies1573521757716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable("replies")) {
      await queryRunner.addColumns("replies", [
        new TableColumn({
          name: "from",
          type: "int",
          isNullable: false
        }),
        new TableColumn({
          name: "to",
          type: "int",
          isNullable: false
        })
      ]);

      await queryRunner.createForeignKeys("replies", [
        new TableForeignKey({
          columnNames: ["from"],
          referencedColumnNames: ["id"],
          referencedTableName: "comments",
          onUpdate: "CASCADE"
        }),
        new TableForeignKey({
          columnNames: ["to"],
          referencedColumnNames: ["id"],
          referencedTableName: "comments",
          onUpdate: "CASCADE"
        })
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const replies = await queryRunner.getTable("replies");
    const from = replies.foreignKeys.find(
      fk => fk.columnNames.indexOf("from") !== -1
    );
    const to = replies.foreignKeys.find(
      fk => fk.columnNames.indexOf("to") !== -1
    );

    await queryRunner.dropForeignKey("replies", from);
    await queryRunner.dropForeignKey("replies", to);
    await queryRunner.dropColumn("replies", "from");
    await queryRunner.dropColumn("replies", "to");
  }
}
