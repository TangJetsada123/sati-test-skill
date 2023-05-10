import { Injectable } from '@nestjs/common';
import { CreateUserDto,UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

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

  resetPassword(id,password: String){
    return this.userModel.findByIdAndUpdate(id,{password},{new : true})
}


  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
