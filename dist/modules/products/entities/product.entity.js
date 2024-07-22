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
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const cart_Item_entiy_1 = require("../../cart/entities/cart-Item.entiy");
const category_entity_1 = require("../../categories/entities/category.entity");
const favourite_entity_1 = require("../../favourite/entities/favourite.entity");
const order_item_entity_1 = require("../../order/entities/order-item.entity");
const review_entity_1 = require("../../review/entities/review.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, img: { required: true, type: () => String }, rate: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, cartItem: { required: true, type: () => require("../../cart/entities/cart-Item.entiy").CartItem }, category: { required: true, type: () => require("../../categories/entities/category.entity").Category }, orderItem: { required: true, type: () => require("../../order/entities/order-item.entity").OrderItem }, reviews: { required: true, type: () => [require("../../review/entities/review.entity").Review] }, favourites: { required: true, type: () => [require("../../favourite/entities/favourite.entity").Favourite] }, categoryId: { required: true, type: () => Number } };
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_Item_entiy_1.CartItem, (item) => item.cart),
    __metadata("design:type", cart_Item_entiy_1.CartItem)
], Product.prototype, "cartItem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.products),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (item) => item.product),
    __metadata("design:type", order_item_entity_1.OrderItem)
], Product.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourite_entity_1.Favourite, (fav) => fav.product),
    __metadata("design:type", Array)
], Product.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
//# sourceMappingURL=product.entity.js.map