import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  exports: [TypeOrmModule],
})
export class SessionsModule {}
