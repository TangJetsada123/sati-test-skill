import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, BadGatewayException, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UserIdDto,UpdatePostDto} from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { ConfirmDeleteDto } from 'src/user/dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadService: UploadService
    ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createPostDto: CreatePostDto,@UploadedFile() file: Express.Multer.File) {
    const image = await this.uploadService.upload(file)
    createPostDto.post_image = image
    return this.postService.create({...createPostDto});
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':_id')
  findOne(@Param('_id') id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':_id')
  async update(@Param('_id') id: string, @Body() updatePostDto: UpdatePostDto,@UploadedFile() file: Express.Multer.File) {
    const image = await this.uploadService.upload(file)
    updatePostDto.post_image = image 
    return this.postService.update(id,{...updatePostDto});
  }


  @UseGuards(AuthGuard)
  @Delete(':_id')
  remove(@Param('_id') id: string,@Body() confirmDelete: ConfirmDeleteDto) {
    if(Boolean(confirmDelete.confirm) == Boolean(true)){
      return this.postService.remove(id);
    }else{
      throw new BadGatewayException('Confirm to Delete Post permanenly!')
    }
  }
}
