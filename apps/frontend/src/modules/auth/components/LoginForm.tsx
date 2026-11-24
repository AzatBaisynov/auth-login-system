
import { useState, type FormEvent } from 'react';

interface LoginFormProps {
  onSubmit: (login: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!login.trim() || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(login.trim(), password);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось выполнить вход. Попробуйте ещё раз.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] p-4 font-sans">
      <div className="w-full max-w-110 rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-7">
          <h1 className="text-[28px] font-bold tracking-tight text-[#0b1528]">
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
              className="mb-2 block text-sm font-semibold text-[#0b1528]"
            >
              Логин
            </label>

            <input
              id="login"
              type="text"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Введите логин"
              autoComplete="username"
              required
              disabled={isLoading}
              className="h-11 w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[15px] text-[#0b1528] outline-none transition-colors focus:border-[#005ce6] focus:ring-2 focus:ring-[#005ce6]/15 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#0b1528]"
            >
              Пароль
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
              disabled={isLoading}
              className="h-11 w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[15px] text-[#0b1528] outline-none transition-colors focus:border-[#005ce6] focus:ring-2 focus:ring-[#005ce6]/15 disabled:bg-gray-100"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </div>
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
    </div>
  );
}
