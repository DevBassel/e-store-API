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
exports.SeedingService = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const product_entity_1 = require("../products/entities/product.entity");
const order_entity_1 = require("../order/entities/order.entity");
const blacklist_entity_1 = require("../blacklist/entities/blacklist.entity");
let SeedingService = class SeedingService {
    constructor(em) {
        this.em = em;
    }
    async seed(count) {
        for (let index = 0; index < count; index++) {
            await this.genUser();
            const categoryId = (await this.genCategory()).id;
            await this.genPrduct(categoryId);
        }
        return {
            msg: `sedding is done ${count} item is added`,
        };
    }
    async genUser() {
        const password = await (0, bcrypt_1.hash)('password123', await (0, bcrypt_1.genSalt)());
        const userData = {
            username: faker_1.faker.internet.userName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            address: faker_1.faker.location.streetAddress({ useFullAddress: true }),
            password,
        };
        await this.em.save(user_entity_1.User, userData);
    }
    async genCategory() {
        const cat = {
            name: faker_1.faker.commerce.department(),
        };
        const categoryFind = await this.em.findOneBy(category_entity_1.Category, {
            name: cat.name,
        });
        if (categoryFind) {
            return categoryFind;
        }
        else {
            return this.em.save(category_entity_1.Category, cat);
        }
    }
    async genPrduct(catId) {
        const productData = {
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: +faker_1.faker.commerce.price({ min: 100, max: 4000 }),
            img: faker_1.faker.image.url({ width: 600, height: 600 }),
            categoryId: catId,
            stock: faker_1.faker.number.int({ min: 1, max: 500 }),
        };
        await this.em.save(product_entity_1.Product, productData);
    }
    async clear() {
        await this.em.delete(blacklist_entity_1.Blacklist, {});
        await this.em.delete(order_entity_1.Order, {});
        await this.em.delete(product_entity_1.Product, {});
        await this.em.delete(user_entity_1.User, {});
        await this.em.delete(category_entity_1.Category, {});
    }
};
exports.SeedingService = SeedingService;
exports.SeedingService = SeedingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], SeedingService);
//# sourceMappingURL=seeding.service.js.map