"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: (configService) => {
        common_1.Logger.debug('cloudinary config inject');
        return cloudinary_1.v2.config({
            cloud_name: configService.get('CLOUD_NAME'),
            api_key: configService.get('CLOUD_API_KEY'),
            api_secret: configService.get('CLOUD_API_SECRET'),
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=cloudinary.provider.js.map