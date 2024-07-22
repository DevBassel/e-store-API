import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAddress1719085129938 implements MigrationInterface {
  name = 'AddUserAddress1719085129938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "rate" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rate"`);
  }
}
