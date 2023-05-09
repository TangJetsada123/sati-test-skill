import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    ConfigModule,
    MulterModule
  ],
  providers: [UploadService],
  exports:[UploadService]
})
export class UploadModule {}