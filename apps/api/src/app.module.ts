import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import databaseConfig from './config/database.config';
import uploadConfig from './config/upload.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load:[
            databaseConfig,
            uploadConfig,
        ]
    }),
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
          uri: configService.get('database.mongo_uri')
      }),
      inject: [ConfigService]
  }),
    UploadModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
