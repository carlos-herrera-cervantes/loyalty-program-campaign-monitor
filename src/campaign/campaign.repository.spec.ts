import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CampaignRepository } from './campaign.repository';
import { Campaign } from './schemas/campaign.schema';

describe('CampaignRepository', () => {
  let campaignRepository: CampaignRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignRepository,
        {
          provide: getModelToken(Campaign.name),
          useValue: {},
        }
      ],
    }).compile();

    campaignRepository = module.get<CampaignRepository>(CampaignRepository);
  });

  it('Should be defined', () => {
    expect(campaignRepository).toBeDefined();
  });
});
