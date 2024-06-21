import { Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    opts: UploadApiOptions,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        opts,
        (error, result) => {
          if (error) return reject(error);
          // console.log(result);
          resolve(result);
        },
      );

      const readableStream = new Readable();

      readableStream.push(file.buffer);

      readableStream.push(null); // End the stream

      readableStream.pipe(uploadStream);
    });
  }
}
