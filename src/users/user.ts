import { GithubUser } from '../github-user/githuber-user';

export class User {
  constructor(user: Partial<User>) {
    this.id = user.id;
    this.login = user.login;
    this.htmlUrl = user.htmlUrl;
    this.avatarUrl = user.avatarUrl;
    this.createdAt = user.createdAt;
  }

  id: number;
  login: string;
  htmlUrl: string;
  avatarUrl: string;
  createdAt: string;

  static constructFromGithubUser(githubUser: GithubUser): User {
    const user = new User({});
    user.id = githubUser.id;
    user.login = githubUser.login;
    user.avatarUrl = githubUser.avatar_url;
    user.htmlUrl = githubUser.html_url;
    user.createdAt = githubUser.created_at;
    return user;
  }
}
