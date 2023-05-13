import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';

export class CreatePostDto {
  text: string;

  post_image: string;

  userId: Types.ObjectId;
}

export class UserIdDto{
  userId: Types.ObjectId
}

export class PostConfirmDeleteDto{
  confirm: Boolean
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

