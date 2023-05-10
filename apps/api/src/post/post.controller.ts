import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, BadGatewayException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UserIdDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { ConfirmDeleteDto } from 'src/user/dto/user.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadService: UploadService
    ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createPostDto: CreatePostDto,@UploadedFile() file: Express.Multer.File) {
    const image = await this.uploadService.upload(file)
    createPostDto.post_image = image
    return this.postService.create({...createPostDto});
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto,@UploadedFile() file: Express.Multer.File) {
    const image = await this.uploadService.upload(file)
    updatePostDto.post_image = image 
    return this.postService.update(id,{...updatePostDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Body() confirmDelete: ConfirmDeleteDto) {
    console.log(confirmDelete.confirm)
    if(Boolean(confirmDelete.confirm) == Boolean(true)){
      return this.postService.remove(id);
    }else{
      throw new BadGatewayException('Confirm to Delete Post permanenly!')
    }
  }
}
