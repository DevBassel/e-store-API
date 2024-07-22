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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../utils/paginate");
const bcrypt_1 = require("bcrypt");
const email_service_1 = require("../email/email.service");
const success_1 = require("../email/templates/success");
let UserService = class UserService {
    constructor(userRepo, emailServie) {
        this.userRepo = userRepo;
        this.emailServie = emailServie;
    }
    async createUser(userDate) {
        const checkUser = await this.userRepo.findOneBy({ email: userDate.email });
        if (checkUser)
            throw new common_1.ConflictException('user is exist!');
        const hashPassword = await (0, bcrypt_1.hash)(userDate.password, await (0, bcrypt_1.genSalt)());
        await this.userRepo.save({ ...userDate, password: hashPassword });
        this.emailServie.sendEmail({
            subject: 'wellcom in platform',
            to: userDate.email,
            html: (0, success_1.sussessTemp)({ username: userDate.username }),
        });
        return { msg: 'user has been created ^_^' };
    }
    async updateUser(id, update) {
        const user = await this.findOneUser(id);
        return this.userRepo.save({ ...user, ...update });
    }
    async getProfile(user) {
        console.log(user);
        return new user_entity_1.UserSerializer(await this.userRepo.findOne({
            where: { id: user.id },
        }));
    }
    async updateProfile(userData, user) {
        const getUser = await this.findOneUser(user.id);
        if (getUser.id !== user.id)
            throw new common_1.UnauthorizedException();
        await this.userRepo.save({ ...getUser, ...userData });
        return { msg: 'user updated' };
    }
    async findOneUser(id) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('user not found O_o');
        return new user_entity_1.UserSerializer(user);
    }
    findWithEmail(email) {
        return this.userRepo.findOneBy({ email });
    }
    async getAllUsers(page = 1, limit = 10) {
        const query = this.userRepo.createQueryBuilder('user');
        const { data, ...metadata } = await (0, paginate_1.paginate)(query, page, limit);
        return { data: data.map((user) => new user_entity_1.UserSerializer(user)), metadata };
    }
    deleteUser(userId) {
        return { msg: `will delete this user ${userId}` };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map