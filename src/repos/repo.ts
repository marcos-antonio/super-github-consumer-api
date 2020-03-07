import { User } from '../users/user';

export class Repo {
  constructor(repo: Partial<Repo>) {
    this.id = repo.id;
    this.name = repo.name;
    this.htmlUrl = repo.htmlUrl;
    this.owner = repo.owner;
  }

  id: number;
  name: string;
  htmlUrl: string;

  owner: User;
}
