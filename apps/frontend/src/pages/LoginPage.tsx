import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/modules/auth/api/authApi';

export const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);

      await loginUser({ login, password });

      navigate('/users');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-b border-[#e2e8f0] px-6 py-4">
        <div className="flex items-center gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="12" width="4" height="9" rx="1" fill="#005ce6" />
            <rect x="10" y="7" width="4" height="14" rx="1" fill="#005ce6" />
            <rect x="17" y="3" width="4" height="18" rx="1" fill="#005ce6" />
          </svg>

          <span className="text-[16px] font-bold text-[#0b1528]">
            Мониторинг пользователей
          </span>
        </div>

        <span className="hidden text-sm text-[#64748b] sm:block">
          Учебный проект / NestJS + React
        </span>
      </header>

      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-[#eef4fb] px-4 py-12">
        <div className="w-full max-w-[440px] rounded-2xl bg-white p-8 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.12)] sm:p-10">
          <div className="mb-7">
            <h1 className="text-[28px] leading-tight font-bold tracking-tight text-[#0b1528]">
              Вход в систему
            </h1>

            <p className="mt-1.5 text-[15px] text-[#475569]">
              Введите логин и пароль
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login"
                className="mb-2 block text-[14px] font-semibold text-[#0b1528]"
              >
                Логин
              </label>

              <input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
                autoComplete="username"
                required
                disabled={isLoading}
                className="h-11 w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[15px] text-[#0b1528] transition-colors outline-none focus:border-[#005ce6] focus:ring-2 focus:ring-[#005ce6]/15 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[14px] font-semibold text-[#0b1528]"
              >
                Пароль
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="h-11 w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[15px] text-[#0b1528] transition-colors outline-none focus:border-[#005ce6] focus:ring-2 focus:ring-[#005ce6]/15 disabled:bg-gray-100"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full cursor-pointer rounded-lg bg-[#005ce6] text-[15px] font-semibold text-white transition-colors hover:bg-[#004ec4] active:bg-[#0042a6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
