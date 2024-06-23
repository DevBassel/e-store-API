import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1719011826685 implements MigrationInterface {
  name = 'InitialMigration1719011826685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "rate" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rate"`);
  }
}
