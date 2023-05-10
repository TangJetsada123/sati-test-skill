import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, UsePipes, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfirmDeleteDto, CreateUserDto, PasswordDto, UservalidateSchema } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { YupValidatorPipe } from 'src/validation/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) { }

  @UseGuards(AuthGuard)
  @UsePipes(new YupValidatorPipe(UservalidateSchema))
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    const email = await this.userService.findByEmail(createUserDto.email)
    if (email) {
      throw new BadRequestException("Email is Already!")
    }
    const image = await this.uploadService.upload(file)
    createUserDto.profile_image = image
    const salt = await bcrypt.genSalt()
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt)
    return this.userService.create({ ...createUserDto });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':_id')
  findOne(@Param('_id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard)
  @Put(':_id')
  update(@Param('_id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  //this route will reset password and check new password must not same as last 5 older password 
  @Put('/reset-password/:_id')
  async ResetPassword(@Param('_id') userId, @Body() userDto: PasswordDto) {
    const user = await this.userService.findOne(userId)
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(userDto.password, salt)

    if (!user) {
      throw new BadRequestException('The user is undefined or null. Please provide a valid user.')
    }

    const olderPassword = user.lastPassword
    for (let i in olderPassword) {
      let isMatch = await bcrypt.compare(userDto.password, olderPassword[i])
      if (isMatch) {
        throw new BadRequestException('Your password matches one of your last 5 passwords. Please choose a different password.')
      }
    }

    user.lastPassword.unshift(user.password)

    user.lastPassword = user.lastPassword.slice(0, 5)

    user.password = hash

    const newHash = user.password

    await this.userService.resetPassword(userId, newHash)

    return await user.save()
  }

  @UseGuards(AuthGuard)
  @Delete(':_id')
  remove(@Param('_id') id: string, @Body() confirmDto: ConfirmDeleteDto) {
    if (confirmDto.confirm == true) {
      return this.userService.remove(id);
    } else {
      throw new BadRequestException('Please Confirm To Delete Permanently')
    }
  }
}
