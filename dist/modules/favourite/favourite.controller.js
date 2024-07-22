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
exports.FavouriteController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const favourite_service_1 = require("./favourite.service");
const create_favourite_dto_1 = require("./dto/create-favourite.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let FavouriteController = class FavouriteController {
    constructor(favouriteService) {
        this.favouriteService = favouriteService;
    }
    create(createFavouriteDto, req) {
        return this.favouriteService.create(createFavouriteDto, req.user);
    }
    findAll(req) {
        return this.favouriteService.findAll(req.user);
    }
    findOne(id) {
        return this.favouriteService.findOne(+id);
    }
    remove(id, req) {
        return this.favouriteService.remove(+id, req.user);
    }
};
exports.FavouriteController = FavouriteController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favourite_dto_1.CreateFavouriteDto, Object]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/favourite.entity").Favourite] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/favourite.entity").Favourite }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "remove", null);
exports.FavouriteController = FavouriteController = __decorate([
    (0, common_1.Controller)('favourite'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiTags)('Favourites'),
    __metadata("design:paramtypes", [favourite_service_1.FavouriteService])
], FavouriteController);
//# sourceMappingURL=favourite.controller.js.map