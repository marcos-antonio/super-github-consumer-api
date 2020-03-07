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
  getAll(@Req() request: Request, @Query('since') since?: number) {
    const users = this.service.getAll(since);
    const lastUserId = users.length > 0 ? users[users.length - 1].id : null;
    request.res.setHeader('link', this.getLinkHeader(request.host, lastUserId));
    request.res.send(users);
  }

  private getLinkHeader(host: string, since?: number) {
    if (host === 'localhost') host += ':3001';
    if (!since) return `<${host}/users/(?since)>; rel="first"`;
    return `<${host}/users?since=${since}; rel="next", <${host}/users/(?since)>; rel="first"`;
  }

  @Get(':username/details')
  getUser(@Param('username') login: string): User {
    const user = this.service.getByLogin(login);
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
  getUserRepos(@Param('username') login: string): Repo[] {
    return this.service.getUserRepos(login);
  }
}
