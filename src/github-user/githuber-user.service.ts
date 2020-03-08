import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GithubUser } from './githuber-user';

@Injectable()
export class GithubUserService {
  constructor(private readonly httpService: HttpService) {}

  getAll(since: number): Observable<GithubUser[]> {
    return this.httpService
      .get('http://api.github.com/users', {
        params: {
          since,
        },
        headers: this.getDefaultHeaders(),
      })
      .pipe(map(response => response.data));
  }

  private getDefaultHeaders() {
    return {
      Authorization:
        'Basic bWFyY29zLWFudG9uaW86Nzk1ZWU2ODkxOTUzZTlmMDcwNGYzMDZlN2FiOThiNGZkZTUwMTg0ZQ==',
    };
  }
}
