import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddUserAddress1719085129938 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
