import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UploadModule } from 'src/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,   
    UploadModule,
    ConfigModule,
    AuthModule
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule { }
