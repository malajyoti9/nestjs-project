import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // 👈 enable automatic createdAt and updatedAt
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  address: string;

  //   @Prop({ default: Date.now }) // 👈 adds createdDate on save
  //   createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
