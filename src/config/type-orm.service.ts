import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Campaign } from '../campaign/entities/campaign.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('LOYALTY_HOST'),
      port: this.configService.get<number>('LOYALTY_PORT'),
      username: this.configService.get<string>('LOYALTY_USER'),
      password: this.configService.get<string>('LOYALTY_PASS'),
      database: this.configService.get<string>('LOYALTY_DB'),
      entities: [Campaign],
      synchronize: false,
    }
  }
}
