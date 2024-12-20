import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CusClass } from 'src/core/cusClass';

@Module({
  controllers: [UserController],
  providers: [UserService, CusClass],
})
export class UserModule {}
