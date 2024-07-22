"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("./data-source");
const seeding_service_1 = require("./seeding.service");
const dm_controller_1 = require("./dm.controller");
let DBModule = class DBModule {
};
exports.DBModule = DBModule;
exports.DBModule = DBModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    ...data_source_1.ormConfig,
                    autoLoadEntities: true,
                    logger: 'file',
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [dm_controller_1.DbController],
        providers: [seeding_service_1.SeedingService],
    })
], DBModule);
//# sourceMappingURL=DB.module.js.map