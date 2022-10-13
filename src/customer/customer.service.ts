import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  @Inject(CustomerRepository)
  private readonly customerRepository: CustomerRepository;

  async expireCustomerPoints(bucketIds: string[]): Promise<void> {
    const filter = { bucket_id: { $in: bucketIds }, active_points: { $gt: 0 }};

    const totalDocs = await this.customerRepository.count(filter);

    if (!totalDocs) return;

    const cursor = this.customerRepository.getAll(filter);

    const bulkOperations = [];
    const batchSize = 1000;
    let docsCounter = totalDocs;

    cursor.on('data', async customer => {
      const singleOperation = {
        updateOne: {
          filter: { external_user_id: customer.external_user_id },
          update: { expired_points: customer.active_points, active_points: 0 },
          upsert: true,
        },
      };

      bulkOperations.push(singleOperation);

      if (docsCounter < batchSize) {
        await this.customerRepository.bulkUpdate([singleOperation]);
        return;
      }

      if (bulkOperations.length == batchSize) {
        await this.customerRepository.bulkUpdate([singleOperation]);
        bulkOperations.splice(0, bulkOperations.length);
        docsCounter -= batchSize;
      }
    });
  }
}
