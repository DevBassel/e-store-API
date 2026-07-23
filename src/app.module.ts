import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './modules/DB/DB.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalJwtModule } from './modules/jwt/jwt.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';
import { FavouriteModule } from './modules/favourite/favourite.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalJwtModule,
    AuthModule,
    UserModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    CloudinaryModule,
    FavouriteModule,
    DBModule,
    CouponsModule,
  ],
})
export class AppModule {}
