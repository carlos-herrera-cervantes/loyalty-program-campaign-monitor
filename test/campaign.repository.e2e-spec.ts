import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { MongoConfig } from '../src/config/mongo.config';
import { CampaignRepository } from '../src/campaign/campaign.repository';
import { CampaignModule } from '../src/campaign/campaign.module';
import { Campaign } from '../src/campaign/schemas/campaign.schema';
import { UpdateCampaign } from '../src/campaign/dto/update.dto';

let app: INestApplication;
let campaignRepository: CampaignRepository;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(MongoConfig.Db.Loyalty),
      CampaignModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  campaignRepository = module.get<CampaignRepository>(CampaignRepository);
});

afterAll(async () => await app.close());

describe('CampaignRepository', () => {
  it('count - Should return 0', async () => {
    const counter: number = await campaignRepository.count();
    expect(counter).toBeFalsy();
  });

  it('getAll - Should return empty list', async () => {
    const campaigns: Campaign[] = await campaignRepository.getAll();
    expect(campaigns).toHaveLength(0);
  });

  it('update - Should return void', async () => {
    const result = await campaignRepository.update({}, new UpdateCampaign());
    expect(result).toBeUndefined();
  });
});
