import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
    private logger = new Logger(UploadService.name);
    private region: string;
    private s3: S3Client

    constructor(private configService: ConfigService) {
        this.region = 'ap-northeast-1'
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: configService.get('upload.accessKeyId'),
                secretAccessKey: configService.get('upload.secretAccessKey')
            }
        })
    }

    async upload(file: Express.Multer.File) {
        const key = `${file.fieldname}${Date.now()}`;
        const bucket = this.configService.get('upload.bucket')
        const input: PutObjectCommandInput = {
          Body: file.buffer,
          Bucket: bucket,
          Key: key,
          ContentType: file.mimetype,
          ACL: this.configService.get('upload.acl'),
        };
    
        try {
          const response: PutObjectCommandOutput = await this.s3.send(
            new PutObjectCommand(input),
          );
          if (response.$metadata.httpStatusCode === 200) {
            return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
          }
        } catch (err) {
          this.logger.error('Cannot save file to s3,', err);
          throw err;
        }
      }
}