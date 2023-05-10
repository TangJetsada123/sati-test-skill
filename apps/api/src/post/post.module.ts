import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UploadModule } from 'src/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,   
    UploadModule,
    ConfigModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule { }
