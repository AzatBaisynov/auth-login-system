import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersQueryDto } from './dto/users-query.dto.js';
import { UserEntity } from './entities/user.entity.js';
import { UserRole } from './enums/user-role.enum.js';

const BCRYPT_ROUNDS = 12;

export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaginatedUsersResult {
  items: SafeUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  private toSafeUser(user: UserEntity): SafeUser {
    const raw = user as unknown as Record<string, unknown>;
    const { password, passwordHash, ...safeFields } = raw;
    void password;
    void passwordHash;
    return safeFields as unknown as SafeUser;
  }

  private assertAdmin(actorRole?: string): void {
    if (actorRole?.toUpperCase() !== UserRole.ADMIN) {
      throw new ForbiddenException('Доступ разрешён только администратору');
    }
  }

  async create(actorRole: string | undefined, dto: CreateUserDto): Promise<SafeUser> {
    this.assertAdmin(actorRole);

    const normalizedEmail = dto.email.trim().toLowerCase();
    const existing = await this.usersRepository.findOne({
      where: { login: normalizedEmail },
      select:{ id:true},
    });

    if (existing) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const entity = this.usersRepository.create({
      email: normalizedEmail,
      name: dto.name.trim(),
      role: dto.role ?? UserRole.USER,
      passwordHash,
    } as Partial<UserEntity>);

    try {
      const saved = await this.usersRepository.save(entity);
      return this.toSafeUser(saved);
    } catch (error: unknown) {
      const pgCode =
        (error as { code?: string; driverError?: { code?: string } })?.code ??
        (error as { driverError?: { code?: string } })?.driverError?.code;
      if (pgCode === '23505') {
        throw new ConflictException('Пользователь с таким email уже существует');
      }
      throw error;
    }
  }

  async listForAdmin(
    actorRole: string | undefined,
    query: UsersQueryDto,
  ): Promise<PaginatedUsersResult> {
    this.assertAdmin(actorRole);

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const qb = this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (query.role) {
      qb.andWhere('user.role = :role', { role: query.role });
    }

    if (query.search?.trim()) {
      const pattern = `%${query.search.trim()}%`;
      qb.andWhere('(user.email ILIKE :pattern OR user.name ILIKE :pattern)', { pattern });
    }

    const [entities, total] = await qb.getManyAndCount();

    return {
      items: entities.map((item) => this.toSafeUser(item)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }
}
