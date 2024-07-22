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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
const role_decorator_1 = require("../../decorator/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const role_guard_1 = require("../auth/guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const queryArray_decorator_1 = require("../../decorator/queryArray.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers(page, limit) {
        return this.userService.getAllUsers(page, limit);
    }
    getProfile(req) {
        return this.userService.getProfile(req.user);
    }
    updateProfile(updateUserDto, req) {
        delete updateUserDto.password;
        return this.userService.updateProfile(updateUserDto, req.user);
    }
    getOneUser(userId) {
        return this.userService.findOneUser(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, queryArray_decorator_1.ApiQueryArray)([
        {
            name: 'page',
        },
        {
            name: 'limit',
            required: false,
        },
    ]),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('profile'),
    openapi.ApiResponse({ status: 200, type: require("./entities/user.entity").UserSerializer }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('find/:userId'),
    openapi.ApiResponse({ status: 200, type: require("./entities/user.entity").UserSerializer }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOneUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map