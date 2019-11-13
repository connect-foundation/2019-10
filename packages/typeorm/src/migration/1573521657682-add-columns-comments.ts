import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class addColumnsComments1573521657682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable("comments")) {
      await queryRunner.addColumns("comments", [
        new TableColumn({
          name: "userId",
          type: "int",
          isNullable: false
        }),
        new TableColumn({
          name: "videoId",
          type: "int",
          isNullable: false
        })
      ]);

      await queryRunner.createForeignKeys("comments", [
        new TableForeignKey({
          columnNames: ["userId"],
          referencedColumnNames: ["id"],
          referencedTableName: "users",
          onUpdate: "CASCADE"
        }),
        new TableForeignKey({
          columnNames: ["videoId"],
          referencedColumnNames: ["id"],
          referencedTableName: "videos",
          onUpdate: "CASCADE"
        })
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const comments = await queryRunner.getTable("comments");
    const userId = comments.foreignKeys.find(
      fk => fk.columnNames.indexOf("userId") !== -1
    );
    const videoId = comments.foreignKeys.find(
      fk => fk.columnNames.indexOf("videoId") !== -1
    );

    await queryRunner.dropForeignKey("comments", userId);
    await queryRunner.dropForeignKey("comments", videoId);
    await queryRunner.dropColumn("comments", "userId");
    await queryRunner.dropColumn("comments", "videoId");
  }
}
