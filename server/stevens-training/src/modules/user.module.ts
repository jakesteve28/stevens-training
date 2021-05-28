import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../providers/user.service';

@Module({
    imports: [],
    providers: [UserService],
    controllers: [UserController],
    exports: []
})
export class UserModule {}
    
