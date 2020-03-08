import { User } from '../users/user';
import { GithubRepo } from '../github-repo/github-repo';

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

  static constructFromGithubRepo(githubRepo: GithubRepo): Repo {
    const repo = new Repo({});
    repo.id = githubRepo.id;
    repo.name = githubRepo.name;
    repo.htmlUrl = githubRepo.html_url;

    return repo;
  }
}
