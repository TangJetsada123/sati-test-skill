import { Injectable, forwardRef } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>
  ){}


  async create(createPostDto: CreatePostDto) {
    await this.userModel.findByIdAndUpdate(
      createPostDto.userId,
      { $inc: { post_count: 1 } },
      { new: true },
    );

    return this.postModel.create(createPostDto)
  }

  findAll() {
    return this.postModel.find()
  }

  findOne(id: string) {
    return this.postModel.findById({_id: id})
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({_id: id},updatePostDto)
  }

  async remove(id: string) {
    const post = await this.postModel.findById({_id: id})
    const userId = post.userId
    await this.postModel.findByIdAndDelete({_id:id})

    await this.userModel.findByIdAndUpdate(
      userId,
      { $inc: { post_count: -1 } },
      { new: true },
    );

    

  }
}
