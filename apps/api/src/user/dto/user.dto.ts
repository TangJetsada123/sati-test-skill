import { PartialType } from '@nestjs/mapped-types';
import * as yup from 'yup'

export class CreateUserDto {

    password: string

    firstname: string

    lastname: string

    birth_date: Date

    profile_image: string

    email: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export class ConfirmDeleteDto {
    confirm : Boolean
}

export class PasswordDto{
    current_password: string
    password: string
}

export const UservalidateSchema = yup.object<CreateUserDto>({
    email: yup.string().email("Invalid email"),
    password: yup.string().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol @$!%*?&"),
    firstname:  yup.string().min(3).max(60),
    lastname:  yup.string().min(3).max(60),
    birth_date: yup.date(),
})

export const PasswordvalidateSchema = yup.object<PasswordDto>({
    password: yup.string().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol @$!%*?&"),
})

