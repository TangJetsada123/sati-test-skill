import { Injectable } from '@nestjs/common';
import { CreateUserDto,UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdatePostDto } from 'src/post/dto/create-post.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}

  create(createUserDto: CreateUserDto) {
      return this.userModel.create(createUserDto)
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: string) {
    return this.userModel.findById(id)
  }

  findByEmail(email: string){
    return this.userModel.findOne({email: email})
  }

  resetPassword(id: string,password: String){
    return this.userModel.findByIdAndUpdate({_id: id},{password},{new : true})
}


  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id,updateUserDto)
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete({_id: id})
  }
}
