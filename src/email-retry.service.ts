import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailRetry } from './email-retry.entity';

@Injectable()
export class EmailRetryService {
  constructor(
    @InjectRepository(EmailRetry)
    private readonly emailRetryRepository: Repository<EmailRetry>,
    private readonly entityManager: EntityManager,
  ) {}

  async incrementRetryCount(message: string): Promise<void> {
    const emailRetry = await this.emailRetryRepository.findOne({
      where: { message }, // Specify the query criteria here
    });

    if (emailRetry) {
      emailRetry.retryCount++;
      await this.emailRetryRepository.save(emailRetry);
    }
  }

  // Other methods for EmailRetryService
}