import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: {},
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
  });

  it('Should be defined', () => expect(customerService).toBeDefined());
});
