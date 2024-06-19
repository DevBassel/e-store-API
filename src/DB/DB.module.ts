import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        port: config.getOrThrow('DB_PORT'),
        host: config.getOrThrow('DB_HOST'),
        database: config.getOrThrow('DB_NAME'),
        username: config.getOrThrow('DB_USERNAME'),
        password: config.getOrThrow('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
        logger: 'file',
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
