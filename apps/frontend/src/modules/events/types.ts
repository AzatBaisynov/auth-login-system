export type UserEventType =
  | 'login_success'
  | 'login_failed'
  | 'logout'
  | 'session_expired';

export interface UserEvent {
  id: string;
  occurredAt: string;
  userId: string | null;
  userName: string;
  eventType: UserEventType;
  sessionId: string | null;
}

export interface EventsQuery {
  userId?: string;
  eventType?: UserEventType;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
