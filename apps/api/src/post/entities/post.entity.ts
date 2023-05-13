import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
    @Prop()
    text: string

    @Prop()
    post_image: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User  | Types.ObjectId;

    @Prop()
    confirm: Boolean
}

export const PostSchema = SchemaFactory.createForClass(Post)