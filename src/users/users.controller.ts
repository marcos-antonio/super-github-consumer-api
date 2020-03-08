import {
  Controller,
  Get,
  Query,
  Req,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user';
import { Repo } from '../repos/repo';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll(@Req() request: Request, @Query('since') since?: number) {
    const users = await this.service.getAll(since).toPromise();
    const lastUserId = users.length > 0 ? users[users.length - 1].id : null;
    request.res.status(HttpStatus.OK);
    request.res.setHeader(
      'link',
      this.getLinkHeader(request.hostname, lastUserId),
    );
    request.res.send(users);
  }

  private getLinkHeader(host: string, since?: number) {
    if (host === 'localhost') host += ':3001';
    if (!since) return `<${host}/users/(?since)>; rel="first"`;
    return `<${host}/users?since=${since}>; rel=next, <${host}/users/(?since)>; rel=first`;
  }

  @Get(':username/details')
  async getUser(@Param('username') login: string): Promise<User> {
    const user = await this.service.getByLogin(login).toPromise();
    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User ${login} not found!`,
        },
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  @Get(':username/repos')
  async getUserRepos(@Param('username') login: string): Promise<Repo[]> {
    return await this.service.getUserRepos(login).toPromise();
  }
}
