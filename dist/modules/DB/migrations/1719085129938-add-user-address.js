"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserAddress1719085129938 = void 0;
class AddUserAddress1719085129938 {
    constructor() {
        this.name = 'AddUserAddress1719085129938';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ADD "rate" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rate"`);
    }
}
exports.AddUserAddress1719085129938 = AddUserAddress1719085129938;
//# sourceMappingURL=1719085129938-add-user-address.js.map