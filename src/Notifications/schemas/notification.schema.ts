/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification &
  Document & {
    _id: string;
  };

@Schema()
export class Notification {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  message: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
