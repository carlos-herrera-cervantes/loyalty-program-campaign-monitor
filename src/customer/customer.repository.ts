import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cursor, FilterQuery, Model, Document, QueryOptions, ObjectId } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerRepository {
  @InjectModel(Customer.name)
  private readonly customerModel: Model<CustomerDocument>;

  getAll(filter?: FilterQuery<Customer>): Cursor<
    Customer & Document<any, any, any> &
    { _id: ObjectId; }, QueryOptions<Customer & Document<any, any, any> &
    { _id: ObjectId; }
  >> {
    return this.customerModel.find(filter).cursor();
  }

  async count(filter?: FilterQuery<Customer>): Promise<number> {
    return this.customerModel.count(filter);
  }

  async bulkUpdate(operations: any[]): Promise<void> {
    await this.customerModel.bulkWrite(operations);
  }
}
