import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { UpdateCampaignDTO } from './dto/update.dto';

@Injectable()
export class CampaignRepository {
  @InjectRepository(Campaign)
  private readonly campaignRepository: Repository<Campaign>;

  async count(filter?: FindManyOptions<Campaign>): Promise<number> {
    return this.campaignRepository.count(filter);
  }

  async update(
    filter: FindOptionsWhere<Campaign>,
    partialCampaign: UpdateCampaignDTO,
  ): Promise<void> {
    await this.campaignRepository.update(filter, partialCampaign);
  }
}
