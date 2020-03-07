import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';

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
}
