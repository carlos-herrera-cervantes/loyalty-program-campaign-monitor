import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignModule } from './campaign/campaign.module';
import { CustomerModule } from './customer/customer.module';
import { MongoConfig } from './config/mongo.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(MongoConfig.Db.Loyalty),
    CustomerModule,
    CampaignModule,
  ],
})
export class AppModule {}
