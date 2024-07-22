"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const DB_module_1 = require("./modules/DB/DB.module");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const blacklist_module_1 = require("./modules/blacklist/blacklist.module");
const jwt_module_1 = require("./modules/jwt/jwt.module");
const products_module_1 = require("./modules/products/products.module");
const categories_module_1 = require("./modules/categories/categories.module");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
const cart_module_1 = require("./modules/cart/cart.module");
const order_module_1 = require("./modules/order/order.module");
const paymeny_module_1 = require("./modules/paymeny/paymeny.module");
const review_module_1 = require("./modules/review/review.module");
const favourite_module_1 = require("./modules/favourite/favourite.module");
const coupons_module_1 = require("./modules/coupons/coupons.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_module_1.GlobalJwtModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            paymeny_module_1.PaymenyModule,
            review_module_1.ReviewModule,
            blacklist_module_1.BlacklistModule,
            cloudinary_module_1.CloudinaryModule,
            favourite_module_1.FavouriteModule,
            DB_module_1.DBModule,
            coupons_module_1.CouponsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map