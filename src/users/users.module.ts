import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GithubUserModule } from '../github-user/github-user.module';

@Module({
  imports: [GithubUserModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
