import React, { useState, useEffect, useMemo, useCallback } from 'react';


type UserStatus = 'online' | 'offline';

interface UserItem {
  id: string;
  name: string;
  login: string;
  status: UserStatus;
  lastSeen: string;
  isCurrentUser?: boolean;
}


const MOCK_USERS: UserItem[] = [
  { id: '1', name: 'Стажёр 1', login: 'trainee1', status: 'online', lastSeen: 'Сегодня, 10:42', isCurrentUser: true },
  { id: '2', name: 'Стажёр 2', login: 'trainee2', status: 'online', lastSeen: 'Сегодня, 10:42' },
  { id: '3', name: 'Стажёр 3', login: 'trainee3', status: 'offline', lastSeen: 'Сегодня, 10:35' },
  { id: '4', name: 'Стажёр 4', login: 'trainee4', status: 'offline', lastSeen: 'Вчера, 17:20' },
  { id: '5', name: 'Стажёр 5', login: 'trainee5', status: 'offline', lastSeen: '—' },
];


async function fetchUsersList(): Promise<UserItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_USERS;
}


export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsersList();
      setUsers(data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    loadUsers();

    const intervalId = setInterval(() => {
      loadUsers();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [loadUsers]);


  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.login.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-slate-900 font-sans">


      <header className="bg-white border-b border-slate-200 px-4 py-3 sm:px-8 sm:py-0 sm:min-h-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-8 sm:h-full">
          <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-slate-900">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 shrink-0 text-blue-600">
              <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />
            </svg>
            <span>Мониторинг пользователей</span>
          </div>

          <nav className="flex items-center gap-4 h-10 sm:gap-6 sm:h-full text-sm font-medium">
            <button className="h-full whitespace-nowrap border-b-2 border-blue-600 text-blue-600 px-1">
              Пользователи
            </button>
            <button className="h-full whitespace-nowrap border-b-2 border-transparent text-slate-500 hover:text-slate-800 px-1">
              Журнал событий
            </button>
          </nav>
        </div>

        <div className="flex w-full items-center justify-between gap-4 text-sm sm:w-auto sm:justify-start">
          <span className="font-medium text-slate-700">Стажёр 1</span>
          <button className="px-4 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition">
            Выйти
          </button>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Пользователи</h1>
          <p className="text-sm text-slate-500 mt-1">Статусы обновляются каждые 15 секунд</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">

          <div className="p-4 flex flex-col gap-3 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative w-full sm:w-72">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Имя или логин"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | UserStatus)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer sm:w-auto"
              >
                <option value="all">Все статусы</option>
                <option value="online">Онлайн</option>
                <option value="offline">Оффлайн</option>
              </select>
            </div>

            <button
              onClick={loadUsers}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition disabled:opacity-50 sm:w-auto"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}>
                <path d="M20 7v5h-5M4 17v-5h5" />
                <path d="M5.64 9a7 7 0 0 1 11.55-2.6L20 12M4 12l2.81 5.6A7 7 0 0 0 18.36 15" />
              </svg>
              <span>Обновить</span>
            </button>
          </div>


          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-200/80 text-xs font-semibold text-slate-700">
                  <th className="py-3.5 px-6">Пользователь</th>
                  <th className="py-3.5 px-6">Логин</th>
                  <th className="py-3.5 px-6">Статус</th>
                  <th className="py-3.5 px-6">Последняя связь</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <span>{user.name}</span>
                        {user.isCurrentUser && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-md">
                            Вы
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600">{user.login}</td>

                    <td className="py-4 px-6">
                      {user.status === 'online' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Онлайн
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                          Оффлайн
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-slate-600">{user.lastSeen}</td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      Пользователи не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-4 border-t border-slate-100 flex flex-col items-center gap-3 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6">
            <div>
              {filteredUsers.length > 0 ? `1–${filteredUsers.length} из ${filteredUsers.length}` : '0 из 0'}
            </div>

            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-medium">
                1
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Онлайн — связь с сервером в последние 90 секунд
        </p>
      </main>
    </div>
  );
};
