import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GithubUser } from './githuber-user';
import { GithubRepo } from '../github-repo/github-repo';

@Injectable()
export class GithubUserService {
  constructor(private readonly httpService: HttpService) {}

  getAll(since: number): Observable<GithubUser[]> {
    return this.httpService
      .get('', {
        params: {
          since,
        },
      })
      .pipe(map(response => response.data));
  }

  getByLogin(login: string): Observable<GithubUser> {
    return this.httpService.get(login).pipe(map(response => response.data));
  }

  getUserRepos(login: string): Observable<GithubRepo[]> {
    return this.httpService
      .get(`${login}/repos`)
      .pipe(map(response => response.data));
  }
}
