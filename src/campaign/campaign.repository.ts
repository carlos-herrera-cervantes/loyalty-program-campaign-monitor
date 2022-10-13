import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { UpdateCampaignDTO } from './dto/update.dto';

@Injectable()
export class CampaignRepository {
  @InjectModel(Campaign.name)
  private readonly campaignRepository: Model<CampaignDocument>;

  async count(filter?: FilterQuery<Campaign>): Promise<number> {
    return this.campaignRepository.count(filter);
  }

  async update(
    filter: FilterQuery<Campaign>,
    partialCampaign: UpdateCampaignDTO,
  ): Promise<void> {
    await this.campaignRepository.findOneAndUpdate(
      filter,
      { $set: partialCampaign },
      { new: true },
    );
  }
}
