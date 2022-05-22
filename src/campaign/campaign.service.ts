import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Between } from 'typeorm';
import { CampaignRepository } from './campaign.repository';

@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);

  @Inject(CampaignRepository)
  private readonly campaignRepository: CampaignRepository;

  @Cron('0 0 * * *')
  async disable_campaigns(): Promise<void> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const filter = {
      endDate: Between(startOfDay, endOfDay),
    };
    const newValues = { active: false };

    await this.campaignRepository
      .update(filter, newValues)
      .catch((err) => this.logger.error(err));
  }
}
