import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignRepository } from './campaign.repository';
import { CampaignService } from './campaign.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [CampaignRepository, CampaignService],
})
export class CampaignModule {}
