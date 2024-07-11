import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',

  useFactory: (configService: ConfigService) => {
    Logger.debug('cloudinary config inject');
    return cloudinary.config({
      cloud_name: configService.get<string>('CLOUD_NAME'),
      api_key: configService.get<string>('CLOUD_API_KEY'),
      api_secret: configService.get<string>('CLOUD_API_SECRET'),
    });
  },

  inject: [ConfigService],
};
