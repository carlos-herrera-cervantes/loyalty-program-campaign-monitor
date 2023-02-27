import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { UpdateCampaign } from './dto/update.dto';

@Injectable()
export class CampaignRepository {
  @InjectModel(Campaign.name)
  private readonly campaignRepository: Model<CampaignDocument>;

  async count(filter?: FilterQuery<Campaign>): Promise<number> {
    return this.campaignRepository.count(filter);
  }

  async getAll(
    filter?: FilterQuery<Campaign>,
    projection?: ProjectionType<CampaignDocument>
  ): Promise<Campaign[]> {
    return this.campaignRepository.find(filter, projection);
  }

  async update(
    filter: FilterQuery<Campaign>,
    partialCampaign: UpdateCampaign,
  ): Promise<void> {
    await this.campaignRepository.findOneAndUpdate(
      filter,
      { $set: partialCampaign },
      { new: true },
    );
  }
}
