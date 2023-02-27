import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CustomerRepository } from '../src/customer/customer.repository';
import { CustomerModule } from '../src/customer/customer.module';
import { MongoConfig } from '../src/config/mongo.config';

let app: INestApplication;
let customerRepository: CustomerRepository;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(MongoConfig.Db.Loyalty),
      CustomerModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  customerRepository = module.get<CustomerRepository>(CustomerRepository);
});

afterAll(async () => await app.close());

describe('CustomerRepository', () => {
  it('getAll - Should return undefined', () => {
    const cursor = customerRepository.getAll();
    expect(cursor).not.toBeUndefined();
  });

  it('count - Should return 0', async () => {
    const counter: number = await customerRepository.count();
    expect(counter).toBeFalsy();
  });

  it('bulkUpdate - Should return void', async () => {
    const result = await customerRepository.bulkUpdate([]);
    expect(result).toBeUndefined();
  });
});
