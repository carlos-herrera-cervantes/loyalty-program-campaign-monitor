import { BaseEntity, Column, Entity } from 'typeorm';

@Entity({ name: 'campaign' })
export class Campaign extends BaseEntity {
  @Column({ name: 'id', primary: true })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'bucket_id' })
  bucketId: string;

  @Column({ name: 'active' })
  active: boolean;
}
