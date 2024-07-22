"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blacklist_entity_1 = require("./entities/blacklist.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let BlacklistService = class BlacklistService {
    constructor(blacklistRepo, jwt, config) {
        this.blacklistRepo = blacklistRepo;
        this.jwt = jwt;
        this.config = config;
    }
    create(createBlacklistDto) {
        console.log('token add');
        if (this.jwt.verify(createBlacklistDto.token, this.config.getOrThrow('JWT_KEY')))
            console.log('valid token');
        return this.blacklistRepo.save(createBlacklistDto);
    }
    async isTokenBlacklisted(token) {
        const check = await this.blacklistRepo.findOneBy({ token });
        console.log({ check });
        return check ? true : false;
    }
    remove() {
        return `This action removes a # blacklist`;
    }
};
exports.BlacklistService = BlacklistService;
exports.BlacklistService = BlacklistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blacklist_entity_1.Blacklist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], BlacklistService);
//# sourceMappingURL=blacklist.service.js.map