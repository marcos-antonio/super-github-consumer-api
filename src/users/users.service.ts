import { Injectable } from '@nestjs/common';

import { User } from './user';
import { Repo } from '../repos/repo';
import { GithubUserService } from '../github-user/githuber-user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly githubUserService: GithubUserService) {}

  private usersList = [
    new User({
      id: 2,
      login: 'defunkt',
      htmlUrl: 'https://github.com/defunkt',
      createdAt: '2011-01-25T18:44:36Z',
    }),
    new User({
      id: 3,
      login: 'pjhyett',
      htmlUrl: 'https://github.com/pjhyett',
      createdAt: '2011-01-25T18:44:36Z',
    }),
    new User({
      id: 4,
      login: 'wycats',
      htmlUrl: 'https://github.com/wycats',
      createdAt: '2011-01-25T18:44:36Z',
    }),
    new User({
      id: 5,
      login: 'ezmobius',
      htmlUrl: 'https://github.com/ezmobius',
      createdAt: '2011-01-25T18:44:36Z',
    }),
    new User({
      id: 6,
      login: 'ivey',
      htmlUrl: 'https://github.com/ivey',
      createdAt: '2011-01-25T18:44:36Z',
    }),
    new User({
      id: 17,
      login: 'vanpelt',
      htmlUrl: 'https://github.com/vanpelt',
    }),
    new User({
      id: 18,
      login: 'wayneeseguin',
      htmlUrl: 'https://github.com/wayneeseguin',
    }),
    new User({
      id: 19,
      login: 'brynary',
      htmlUrl: 'https://github.com/brynary',
    }),
    new User({
      id: 20,
      login: 'kevinclark',
      htmlUrl: 'https://github.com/kevinclark',
    }),
    new User({
      id: 21,
      login: 'technoweenie',
      htmlUrl: 'https://github.com/technoweenie',
    }),
    new User({
      id: 22,
      login: 'macournoyer',
      htmlUrl: 'https://github.com/macournoyer',
    }),
    new User({ id: 23, login: 'takeo', htmlUrl: 'https://github.com/takeo' }),
    new User({
      id: 583231,
      login: 'octocat',
      htmlUrl: 'https://github.com/octocat',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/583231?v=4',
      createdAt: '2011-01-25T18:44:36Z',
    }),
  ];

  private usersRepos: Repo[] = [
    new Repo({
      id: 132935648,
      name: 'boysenberry-repo-1',
      htmlUrl: 'https://github.com/octocat/boysenberry-repo-1',
      owner: new User({ id: 583231, login: 'octocat' }),
    }),
    new Repo({
      id: 18221276,
      name: 'git-consortium',
      htmlUrl: 'https://github.com/octocat/git-consortium',
      owner: new User({ id: 583231, login: 'octocat' }),
    }),
    new Repo({
      id: 20978623,
      name: 'hello-worId',
      htmlUrl: 'https://github.com/octocat/hello-worId',
      owner: new User({ id: 583231, login: 'octocat' }),
    }),
  ];

  getAll(since?: number): Observable<User[]> {
    return this.githubUserService
      .getAll(since ?? 0)
      .pipe(
        map(githubUsers =>
          githubUsers.map(gu => User.constructFromGithubUser(gu)),
        ),
      );
  }

  getByLogin(login: string): User {
    return this.usersList.find(u => u.login === login);
  }

  getUserRepos(login: string): Repo[] {
    return this.usersRepos.filter(r => r.owner.login === login);
  }
}
