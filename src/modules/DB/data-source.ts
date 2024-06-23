import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot();

const configService = new ConfigService();

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  port: configService.getOrThrow<number>('DB_PORT'),
  host: configService.getOrThrow<string>('DB_HOST'),
  database: configService.getOrThrow<string>('DB_NAME'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  entities: ['dist/**/*.entity.js'], // Adjusted for the compiled JavaScript files
  migrations: ['dist/migrations/*.js'], // Adjusted for the compiled JavaScript files
  synchronize: configService.getOrThrow('DB_Sync') === 'true',
};
export default new DataSource(ormConfig);
