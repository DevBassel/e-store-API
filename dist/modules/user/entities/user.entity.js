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
exports.UserSerializer = exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const cart_entity_1 = require("../../cart/entities/cart.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const role_enum_1 = require("../../auth/enums/role.enum");
const review_entity_1 = require("../../review/entities/review.entity");
const favourite_entity_1 = require("../../favourite/entities/favourite.entity");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, address: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, enum: require("../../auth/enums/role.enum").Role }, cart: { required: true, type: () => require("../../cart/entities/cart.entity").Cart }, orders: { required: true, type: () => [require("../../order/entities/order.entity").Order] }, reviews: { required: true, type: () => [require("../../review/entities/review.entity").Review] }, favourites: { required: true, type: () => [require("../../favourite/entities/favourite.entity").Favourite] }, joinAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: role_enum_1.Role.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cart_entity_1.Cart, (cart) => cart.user),
    __metadata("design:type", cart_entity_1.Cart)
], User.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.user),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourite_entity_1.Favourite, (fav) => fav.user),
    __metadata("design:type", Array)
], User.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "joinAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updateAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
class UserSerializer extends User {
    constructor(user) {
        super();
        Object.assign(this, user);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String } };
    }
}
exports.UserSerializer = UserSerializer;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserSerializer.prototype, "password", void 0);
//# sourceMappingURL=user.entity.js.map