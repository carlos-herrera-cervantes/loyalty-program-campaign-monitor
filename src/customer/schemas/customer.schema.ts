import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ versionKey: false })
export class Customer {
  id: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  external_user_id: string;

  @Prop()
  birthdate: Date;

  @Prop()
  active_points: number;

  @Prop()
  expired_points: number;

  @Prop()
  subtracted_points: number;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  bucket_id: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
