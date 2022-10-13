import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CampaignRepository } from './campaign.repository';

@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);

  @Inject(CampaignRepository)
  private readonly campaignRepository: CampaignRepository;

  @Cron('0 0 * * *')
  async disableCampaigns(): Promise<void> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const filter = {
      end_date: { $gte: startOfDay, $lte: endOfDay },
    };

    const campaigns = await this.campaignRepository
      .count(filter)
      .catch(this.logger.error);

    if (!campaigns) {
      this.logger.log('No campaigns to disable');
      return;
    }

    const newValues = { active: false };

    await this.campaignRepository
      .update(filter, newValues)
      .catch(this.logger.error);
  }
}
