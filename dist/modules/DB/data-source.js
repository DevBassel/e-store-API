"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
config_1.ConfigModule.forRoot();
const configService = new config_1.ConfigService();
exports.ormConfig = {
    type: 'postgres',
    port: configService.getOrThrow('DB_PORT'),
    host: configService.getOrThrow('DB_HOST'),
    database: configService.getOrThrow('DB_NAME'),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: configService.getOrThrow('DB_Sync') === 'true',
};
exports.default = new typeorm_1.DataSource(exports.ormConfig);
//# sourceMappingURL=data-source.js.map