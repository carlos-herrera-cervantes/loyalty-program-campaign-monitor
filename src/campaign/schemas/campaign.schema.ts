import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ versionKey: false, collection: 'campaigns' })
export class Campaign {
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  bucket_id: string;

  @Prop()
  active: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
