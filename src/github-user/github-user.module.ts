import { Module, HttpModule } from '@nestjs/common';

import { GithubUserService } from './githuber-user.service';

@Module({
  imports: [HttpModule],
  providers: [GithubUserService],
  exports: [GithubUserService],
})
export class GithubUserModule {}
