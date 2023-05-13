import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto, UserIdDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { Model, ObjectId, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { ObjectAlreadyInActiveTierError } from '@aws-sdk/client-s3';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }


  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const { userId, ...postDto } = createPostDto;
    const user = await this.userModel.findById(userId);
    const post = new this.postModel({ ...postDto, user });
    await post.save();
    await user.updateOne({ $inc: { post_count: 1 } }).exec();
    return post.populate('user');
  }

  findAll() {
    return this.postModel.find().sort({createdAt: 'desc'}).populate('user').exec()
  }

  findOne(id: string) {
    return this.postModel.findById({ _id: id })
  }

  async findAllByUserId(userId: string) {
    if (!Types.ObjectId.isValid(userId)){
      return [];
    }
    return await this.postModel.find({
        user: `${userId}`
    })
    .exec()
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate({ _id: id }, updatePostDto)
  }

  async remove(id: string) {
    try {
      const post = await this.postModel.findById({ _id: id })
      const userId = post.user
      await this.postModel.findByIdAndDelete({ _id: id })
      await this.userModel.findByIdAndUpdate(
        userId,
        { $inc: { post_count: -1 } },
        { new: true },
      );
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
