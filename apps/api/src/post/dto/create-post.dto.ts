export class CreatePostDto {
  text: string;

  post_image: string;

  userId: string;
}

export class UserIdDto{
  userId: string
}

export class PostConfirmDeleteDto{
  confirm: Boolean
}
