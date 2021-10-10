import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';
import { NotificationGateway } from 'src/gateways/notification.gateway';
import { WsThrottlerGuard } from 'src/guards/ws.throttler-guard';
import { UserModule } from './user.module';

@Module({
    imports: [UserModule,
        JwtModule.register({
            secret: process.env.REFRESH_SECRET,
            signOptions: { expiresIn: '900s' },
          })  
    ],
    providers: [NotificationGateway,
        {
            provide: APP_GUARD,
            useClass: WsThrottlerGuard
          }
    ],
    exports: [NotificationGateway]
})
export class NotificationModule {}