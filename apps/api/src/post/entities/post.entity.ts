import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
    @Prop()
    text: string

    @Prop()
    post_image: string

    @Prop()
    userId: Types.ObjectId

    @Prop()
    confirm: Boolean
}

export const PostSchema = SchemaFactory.createForClass(Post)