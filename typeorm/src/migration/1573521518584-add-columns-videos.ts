import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class addColumnsVideos1573521518584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable("videos")) {
      await queryRunner.addColumn(
        "videos",
        new TableColumn({
          name: "owner",
          type: "int",
          isNullable: false
        })
      );
      await queryRunner.createForeignKey(
        "videos",
        new TableForeignKey({
          columnNames: ["owner"],
          referencedColumnNames: ["id"],
          referencedTableName: "users",
          onUpdate: "CASCADE"
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const videos = await queryRunner.getTable("videos");
    const owner = videos.foreignKeys.find(
      fk => fk.columnNames.indexOf("owner") !== -1
    );

    await queryRunner.dropForeignKey("videos", owner);
    await queryRunner.dropColumn("videos", "owner");
  }
}
