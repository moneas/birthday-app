import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailRetry } from './email-retry.entity';
import { EmailRetryService } from './email-retry.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailRetry])],
  providers: [EmailRetryService],
  exports: [EmailRetryService], // Export the service to be used in other modules
})
export class EmailRetryModule {}
