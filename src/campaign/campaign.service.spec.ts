import { Test, TestingModule } from '@nestjs/testing';
import { CampaignRepository } from './campaign.repository';
import { CampaignService } from './campaign.service';

describe('CampaignService', () => {
  let campaignService: CampaignService;
  let campaignRepository: CampaignRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: CampaignRepository,
          useValue: {
            update: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    campaignService = module.get<CampaignService>(CampaignService);
    campaignRepository = module.get<CampaignRepository>(CampaignRepository);
  });

  it('Should be defined', () => {
    expect(campaignService).toBeDefined();
  })

  it('Should return when there are no campaigns to disable', async () => {
    const mockUpdateFromCampaignRepository = jest
      .spyOn(campaignRepository, 'update')
      .mockImplementation(() => Promise.resolve());

    const mockCountFromCampaignRepository = jest
      .spyOn(campaignRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    await campaignService.disableCampaigns();

    expect(mockUpdateFromCampaignRepository).toBeCalledTimes(0);
    expect(mockCountFromCampaignRepository).toBeCalledTimes(1);
  });

  it('Should disable campaigns', async () => {
    const mockUpdateFromCampaignRepository = jest
      .spyOn(campaignRepository, 'update')
      .mockImplementation(() => Promise.resolve());

    const mockCountFromCampaignRepository = jest
      .spyOn(campaignRepository, 'count')
      .mockImplementation(() => Promise.resolve(100));

    await campaignService.disableCampaigns();

    expect(mockUpdateFromCampaignRepository).toBeCalledTimes(1);
    expect(mockCountFromCampaignRepository).toBeCalledTimes(1);
  });
});
