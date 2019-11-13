import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn
} from "typeorm";

export class addColumnsTaggedVideos1573521605970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasTable("tagged_videos")) {
      await queryRunner.addColumns("tagged_videos", [
        new TableColumn({
          name: "videoId",
          type: "int",
          isNullable: false
        }),
        new TableColumn({
          name: "tagId",
          type: "int",
          isNullable: false
        })
      ]);

      await queryRunner.createForeignKeys("tagged_videos", [
        new TableForeignKey({
          columnNames: ["videoId"],
          referencedTableName: "videos",
          referencedColumnNames: ["id"],
          onUpdate: "CASCADE"
        }),
        new TableForeignKey({
          columnNames: ["tagId"],
          referencedTableName: "tags",
          referencedColumnNames: ["id"],
          onUpdate: "CASCADE"
        })
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const taggedVideo = await queryRunner.getTable("tagged_videos");
    const videoId = taggedVideo.foreignKeys.find(
      fk => fk.columnNames.indexOf("videoId") !== -1
    );
    const tagId = taggedVideo.foreignKeys.find(
      fk => fk.columnNames.indexOf("tagId") !== -1
    );

    await queryRunner.dropForeignKeys("tagged_videos", [videoId, tagId]);
    await queryRunner.dropColumn("tagged_videos", "tagId");
    await queryRunner.dropColumn("tagged_videos", "videoId");
  }
}
