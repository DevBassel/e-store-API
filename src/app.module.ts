import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './modules/DB/DB.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlacklistModule } from './modules/blacklist/blacklist.module';
import { GlobalJwtModule } from './modules/jwt/jwt.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { PaymenyModule } from './modules/paymeny/paymeny.module';
import { ReviewModule } from './modules/review/review.module';

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
    PaymenyModule,
    ReviewModule,
    BlacklistModule,
    CloudinaryModule,
    DBModule,
  ],
})
export class AppModule {}
