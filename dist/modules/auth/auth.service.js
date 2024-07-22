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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const blacklist_service_1 = require("../blacklist/blacklist.service");
const email_service_1 = require("../email/email.service");
const reset_password_1 = require("../email/templates/reset-password");
let AuthService = class AuthService {
    constructor(userService, blacklistService, jwt, emailService) {
        this.userService = userService;
        this.blacklistService = blacklistService;
        this.jwt = jwt;
        this.emailService = emailService;
    }
    register(userData) {
        return this.userService.createUser(userData);
    }
    async login(userData) {
        const user = await this.userService.findWithEmail(userData.email);
        if (!user)
            throw new common_1.UnauthorizedException('email or password is wrong O_o');
        const check = await (0, bcrypt_1.compare)(userData.password, user.password);
        if (!check)
            throw new common_1.UnauthorizedException('email or password is wrong O_o');
        return {
            accessToken: this.jwt.sign({
                username: user.username,
                id: user.id,
                email: user.email,
                role: user.role,
            }),
        };
    }
    async logout(req) {
        const token = req.headers.authorization?.split(' ')[1];
        await this.blacklistService.create({ token });
        return { msg: 'logout success' };
    }
    async forgotPassword(data) {
        const user = await this.userService.findWithEmail(data.email);
        if (user) {
            const token = this.jwt.sign({
                type: 'reset-password',
                id: user.id,
            }, {
                expiresIn: '5m',
            });
            const link = `${process.env.HOST}/api/v1/auth/reset-password-email?token=${token}`;
            this.emailService.sendEmail({
                to: user.email,
                subject: 'reset password',
                html: (0, reset_password_1.resetPasswordTemp)(link),
            });
        }
        return { msg: 'check your email ^_^' };
    }
    async resetPasswordFromEmail(token, data) {
        try {
            const tokenValue = this.jwt.verify(token);
            const checkToken = await this.blacklistService.isTokenBlacklisted(token);
            if (checkToken)
                throw new common_1.BadRequestException('link has been expiered O_o');
            if (tokenValue.type !== 'reset-password')
                throw new common_1.BadRequestException();
            await this.passwordReset(data.newPassword, tokenValue.id);
            await this.blacklistService.create({ token });
            return { msg: 'password has been reset' };
        }
        catch (error) {
            return { msg: error.message };
        }
    }
    async resetPasswordUser(user, data) {
        const checkUser = await this.userService.findOneUser(user.id);
        if (!(0, bcrypt_1.compare)(data.password, checkUser.password))
            throw new common_1.UnauthorizedException();
        return this.passwordReset(data.newPassword, user.id);
    }
    async passwordReset(newPassword, userId) {
        const hashPassword = await (0, bcrypt_1.hash)(newPassword, await (0, bcrypt_1.genSalt)());
        await this.userService.updateUser(userId, {
            password: hashPassword,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        blacklist_service_1.BlacklistService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map