/// <reference types="multer" />
import { UploadApiOptions } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, opts: UploadApiOptions): Promise<CloudinaryResponse>;
}
