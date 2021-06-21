import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue, OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bull';
import { plainToClass } from 'class-transformer';
import { User } from '../entities/user.entity';
/**
 * Thx 
 * https://firxworx.com/blog/coding/nodejs/email-module-for-nestjs-with-bull-queue-and-the-nest-mailer/
 * 
 */
@Processor('mailqueue')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
  }

  @Process('confirmation')
  async sendWelcomeEmail(job: Job<{ user: User, code: string }>): Promise<any> {
    this.logger.log(`Sending confirmation email to '${job.data.user.email}'`);
    const url = `${this.configService.get<string>('DOMAIN')}/auth/${job.data.code}/confirm`

    try {
      const result = await this.mailerService.sendMail({
        template: 'confirmation',
        context: {
          ...plainToClass(User, job.data.user),
          url: url,
        },
        subject: `Welcome to Stevens Training! Please Confirm Your Email Address`,
        to: job.data.user.email,
      })
      return result
    } catch (error) {
      this.logger.error(`Failed to send confirmation email to '${job.data.user.email}'`, error.stack)
      throw error
    }
  }
}

@Injectable()
export class MailService {
  constructor(
    @InjectQueue("mailqueue")
    private mailQueue: Queue,
  ) {}
   private readonly logger = new Logger(MailService.name); 
   /** Send email confirmation link to new user account. */
   async sendConfirmationEmail(user: User, code: string): Promise<boolean> {
    try {
      await this.mailQueue.add('confirmation', {
        user,
        code,
      })
      return true
    } catch (error) {
      this.logger.error(`Error queueing confirmation email to user ${user.email}`)
      return false
    }
  }
}