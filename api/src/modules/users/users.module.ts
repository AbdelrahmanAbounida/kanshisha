import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Account,
  Session,
  VerificationToken,
} from './entities/user.entity';
import { CustomLogger } from 'src/common/logging/app-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Account, Session, VerificationToken]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CustomLogger],
  exports: [UsersService],
})
export class UsersModule {}
