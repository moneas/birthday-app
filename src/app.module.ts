import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { EmailRetryModule } from './email-retry.module';
import { User } from './user/user.entity';
import { EmailRetry } from './email-retry.entity';
import { EmailService } from './email/email.service';
import { BirthdayMessageService } from './birthday-message.service';
import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [EmailRetry, User],
      synchronize: true,
    }),
    UserModule,
    EmailRetryModule,
  ],
  controllers: [UserController],
  providers: [UserService, EmailService, BirthdayMessageService],
})
export class AppModule {}
