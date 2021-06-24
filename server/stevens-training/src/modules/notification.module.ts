import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NotificationGateway } from 'src/gateways/notification.gateway';
import { UserModule } from './user.module';

@Module({
    imports: [UserModule,
        JwtModule.register({
            secret: process.env.REFRESH_SECRET,
            signOptions: { expiresIn: '900s' },
          }),
    ],
    providers: [NotificationGateway],
    exports: [NotificationGateway]
})
export class NotificationModule {}