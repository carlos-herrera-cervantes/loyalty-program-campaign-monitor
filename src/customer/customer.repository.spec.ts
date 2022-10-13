import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from './customer.repository';
import { Customer } from './schemas/customer.schema';

describe('CustomerRepository', () => {
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerRepository,
        {
          provide: getModelToken(Customer.name),
          useValue: {},
        },
      ],
    }).compile();

    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('Should be defined', () => expect(customerRepository).toBeDefined());
});
