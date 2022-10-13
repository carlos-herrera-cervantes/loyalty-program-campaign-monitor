import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../customer/customer.service';
import { CampaignRepository } from './campaign.repository';
import { CampaignService } from './campaign.service';
import { Campaign } from './schemas/campaign.schema';

describe('CampaignService', () => {
  let campaignService: CampaignService;
  let campaignRepository: CampaignRepository;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: CampaignRepository,
          useValue: {
            update: jest.fn(),
            count: jest.fn(),
            getAll: jest.fn(),
          },
        },
        {
          provide: CustomerService,
          useValue: {
            expireCustomerPoints: jest.fn(),
          },
        },
      ],
    }).compile();

    campaignService = module.get<CampaignService>(CampaignService);
    campaignRepository = module.get<CampaignRepository>(CampaignRepository);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('Should be defined', () => {
    expect(campaignService).toBeDefined();
  })

  it('Should return when there are no campaigns to disable', async () => {
    const mockUpdateFromCampaignRepository = jest
      .spyOn(campaignRepository, 'update')
      .mockImplementation(() => Promise.resolve());

    const mockCountFromCampaignRepository = jest
      .spyOn(campaignRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([]));

    await campaignService.disableCampaigns();

    expect(mockUpdateFromCampaignRepository).toBeCalledTimes(0);
    expect(mockCountFromCampaignRepository).toBeCalledTimes(1);
  });

  it('Should disable campaigns', async () => {
    const mockUpdateFromCampaignRepository = jest
      .spyOn(campaignRepository, 'update')
      .mockImplementation(() => Promise.resolve());

    const mockCountFromCampaignRepository = jest
      .spyOn(campaignRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([new Campaign()]));

    const mockExpireCustomerPointsFromCustomerService = jest
      .spyOn(customerService, 'expireCustomerPoints')
      .mockImplementation(() => Promise.resolve());

    await campaignService.disableCampaigns();

    expect(mockUpdateFromCampaignRepository).toBeCalledTimes(1);
    expect(mockCountFromCampaignRepository).toBeCalledTimes(1);
    expect(mockExpireCustomerPointsFromCustomerService).toBeCalledTimes(1);
  });
});
