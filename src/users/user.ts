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
}
