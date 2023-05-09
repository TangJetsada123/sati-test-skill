import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    firstname: string

    @Prop()
    lastname: string

    @Prop()
    profile_image: string

    @Prop()
    lastPassword: string[]

    @Prop()
    birth_date: Date

    @Prop()
    confirm: Boolean
}

export const UserSchema = SchemaFactory.createForClass(User)