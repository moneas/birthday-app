import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EmailRetryService } from './email-retry.service';
import { UserService } from './user/user.service';
import * as cron from 'node-cron';

@Injectable()
export class BirthdayMessageService {
  constructor(private readonly emailRetryService: EmailRetryService, private readonly userService: UserService) {
    console.log('BirthdayMessageService instantiated'); // Add this line
    cron.schedule('0 9 * * *', () => {
      this.sendBirthdayMessages();
    });
  }

  async sendBirthdayMessages() {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
      const currentDay = currentDate.getDate();

      const users = await this.userService.getUsersByBirthday(currentMonth, currentDay);

      for (const user of users) {
        const fullName = `${user.firstName} ${user.lastName}`;
        const message = `Hey, ${fullName}, it's your birthday`;

        const status = await this.sendEmail(message);

        if (status !== 200) {
          await this.emailRetryService.incrementRetryCount(message);
        }
      }
    } catch (error) {
      console.error('Error sending birthday messages:', error);
    }
  }

  async sendEmail(message: string): Promise<number> {
    try {
      const emailServiceEndpoint = 'https://email-service.digitalenvision.com.au';
      const response = await axios.post(emailServiceEndpoint, { message });

      if (response.status === 200) {
        console.log('Birthday message sent successfully');
      } else {
        console.error('Failed to send birthday message');
      }

      return response.status;
    } catch (error) {
      console.error('Error sending email:', error);
      return 0; // Return 0 to indicate an error
    }
  }
}
