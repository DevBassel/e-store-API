import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ormConfig,
        autoLoadEntities: true,
        logger: 'file',
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
