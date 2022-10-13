import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CustomerService } from '../customer/customer.service';
import { CampaignRepository } from './campaign.repository';

@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);

  @Inject(CampaignRepository)
  private readonly campaignRepository: CampaignRepository;

  @Inject(CustomerService)
  private readonly customerService: CustomerService;

  @Cron('0 0 * * *')
  async disableCampaigns(): Promise<void> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const filter = {
      end_date: { $gte: startOfDay, $lte: endOfDay },
      active: true,
    };
    const campaigns = await this.campaignRepository
      .getAll(filter, { bucket_id: true })
      .catch(() => []);

    if (!campaigns.length) {
      this.logger.log('No campaigns to disable');
      return;
    }

    await this.campaignRepository
      .update(filter, { active: false })
      .catch(this.logger.error);

    const bucketIds = campaigns.map(campaign => campaign.bucket_id);
    await this.customerService
      .expireCustomerPoints(bucketIds)
      .catch(this.logger.error);
  }
}
