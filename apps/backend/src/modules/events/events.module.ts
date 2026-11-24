import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEventEntity } from './entities/auth-event.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEventEntity])],
  exports: [TypeOrmModule],
})
export class EventsModule {}
