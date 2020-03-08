import { Module, HttpModule } from '@nestjs/common';

import { GithubUserService } from './githuber-user.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://api.github.com/users',
      auth: {
        username: 'marcos-antonio',
        password: '795ee6891953e9f0704f306e7ab98b4fde50184e',
      },
    }),
  ],
  providers: [GithubUserService],
  exports: [GithubUserService],
})
export class GithubUserModule {}
