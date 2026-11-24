import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from '../../sessions/entities/session.entity.js';
import { UserEntity } from '../../users/entities/user.entity.js';
import { AuthEventType } from '../enums/event-type.enum.js';

@Entity({ name: 'auth_events' })
export class AuthEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'event_type', type: 'enum', enum: AuthEventType })
  eventType!: AuthEventType;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actor_user_id' })
  actorUser!: UserEntity | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'target_user_id' })
  targetUser!: UserEntity | null;

  @ManyToOne(() => SessionEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'session_id' })
  session!: SessionEntity | null;

  @Column({
    name: 'attempted_login',
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  attemptedLogin!: string | null;

  @CreateDateColumn({ name: 'occurred_at', type: 'timestamptz' })
  occurredAt!: Date;
}
