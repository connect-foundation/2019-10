import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class taggedVideos1573489986529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "tagged_videos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("tagged_videos", true, true);
  }
}
