export type UserStatus = 'online' | 'offline';

export interface MonitoredUser {
  id: string;
  name: string;
  login: string;
  status: UserStatus;
  lastSeenAt: string | null;
}

export interface UsersQuery {
  search?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}
