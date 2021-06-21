import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailProcessor, MailService  } from '../providers/mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';

@Module({
imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'localhost',
          port: 1025,
          secure: false,
          ignoreTLS: true,
          auth: {
            user: '',
            pass: '',
          },
        },
        defaults: {
          from: 'No Reply <no-reply@localhost>',
        },
        template: {
          dir: '../templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: 'mailqueue',
      useFactory: () => ({}),
    }),
  ],
  controllers: [],
  providers: [
    MailService,
    MailProcessor,
  ],
  exports: [
    MailService,
  ],
})
export class MailModule {}
