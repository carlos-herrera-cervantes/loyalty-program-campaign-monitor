import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { CampaignRepository } from './campaign.repository';
import { CampaignService } from './campaign.service';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    CustomerModule,
  ],
  providers: [CampaignRepository, CampaignService],
})
export class CampaignModule {}
