import { Controller, Post, Body } from '@nestjs/common';
import { EmailRetryService } from './email-retry.service';

@Controller('email-retry')
export class EmailRetryController {
  constructor(private readonly emailRetryService: EmailRetryService) {}

  @Post('increment')
  async incrementRetryCount(@Body() { message }: { message: string }): Promise<void> {
    await this.emailRetryService.incrementRetryCount(message);
  }

  // Implement other endpoints for EmailRetry entity
}
