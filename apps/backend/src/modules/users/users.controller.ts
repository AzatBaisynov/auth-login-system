import { Body, Controller, Get, Headers, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersQueryDto } from './dto/users-query.dto.js';
import { PaginatedUsersResult, SafeUser, UsersService } from './users.service.js';

interface RequestWithUser extends Request {
  user?: {
    id?: string;
    role?: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private resolveActorRole(req: RequestWithUser, headerRole?: string): string | undefined {
    return req.user?.role ?? headerRole;
  }

  @Get()
  async findAll(
    @Req() req: RequestWithUser,
    @Headers('x-user-role') headerRole: string | undefined,
    @Query() query:UsersQueryDto,
  ): Promise<PaginatedUsersResult> {
    return this.usersService.listForAdmin(this.resolveActorRole(req, headerRole), query);
  }

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Headers('x-user-role') headerRole: string | undefined,
    @Body() dto: CreateUserDto,
  ): Promise<SafeUser> {
    return this.usersService.create(this.resolveActorRole(req, headerRole), dto);
  }
}
