import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  private usersList = [
    new User({
      id: 2,
      login: 'defunkt',
      htmlUrl: 'https://github.com/defunkt',
    }),
    new User({
      id: 3,
      login: 'pjhyett',
      htmlUrl: 'https://github.com/pjhyett',
    }),
    new User({ id: 4, login: 'wycats', htmlUrl: 'https://github.com/wycats' }),
    new User({
      id: 5,
      login: 'ezmobius',
      htmlUrl: 'https://github.com/ezmobius',
    }),
    new User({ id: 6, login: 'ivey', htmlUrl: 'https://github.com/ivey' }),
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

  getAll(since?: number): User[] {
    return this.usersList
      .filter((u, i) => {
        if (!since) return i <= 5;
        return u.id > since;
      })
      .slice(0, 5);
  }

  getByLogin(login: string): User {
    return this.usersList.find(u => u.login === login);
  }
}
