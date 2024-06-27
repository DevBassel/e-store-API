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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalJwtModule,
    DBModule,
    UserModule,
    AuthModule,
    BlacklistModule,
    ProductsModule,
    CategoriesModule,
    CloudinaryModule,
    CartModule,
  ],
})
export class AppModule {}
