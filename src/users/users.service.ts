import { Injectable } from '@nestjs/common';

import { User } from './user';
import { Repo } from '../repos/repo';
import { GithubUserService } from '../github-user/githuber-user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly githubUserService: GithubUserService) {}

  getAll(since?: number): Observable<User[]> {
    return this.githubUserService
      .getAll(since ?? 0)
      .pipe(
        map(githubUsers =>
          githubUsers.map(gu => User.constructFromGithubUser(gu)),
        ),
      );
  }

  getByLogin(login: string): Observable<User> {
    return this.githubUserService
      .getByLogin(login)
      .pipe(map(gu => User.constructFromGithubUser(gu)));
  }

  getUserRepos(login: string): Observable<Repo[]> {
    return this.githubUserService
      .getUserRepos(login)
      .pipe(
        map(githubRepos =>
          githubRepos.map(gr => Repo.constructFromGithubRepo(gr)),
        ),
      );
  }
}
