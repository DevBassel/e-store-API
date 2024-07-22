"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1719011826685 = void 0;
class InitialMigration1719011826685 {
    constructor() {
        this.name = 'InitialMigration1719011826685';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ADD "rate" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rate"`);
    }
}
exports.InitialMigration1719011826685 = InitialMigration1719011826685;
//# sourceMappingURL=1719011826685-InitialMigration.js.map