import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './data-source';
import { SeedingService } from './seeding.service';
import { DbController } from './dm.controller';

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
  controllers: [DbController],
  providers: [SeedingService],
})
export class DBModule {}
