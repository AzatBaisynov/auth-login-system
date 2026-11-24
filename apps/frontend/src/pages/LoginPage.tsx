import React, { useState } from 'react';

export const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06)] p-8 sm:p-10">
        {/* Заголовок и подзаголовок */}
        <div className="mb-7">
          <h1 className="text-[28px] font-bold text-[#0b1528] tracking-tight leading-tight">
            Вход в систему
          </h1>
          <p className="text-[15px] text-[#475569] mt-1.5">
            Введите логин и пароль
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Поле Логин */}
          <div>
            <label
              htmlFor="login"
              className="block text-[14px] font-semibold text-[#0b1528] mb-2"
            >
              Логин
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
              required
              className="w-full h-11 px-3.5 text-[15px] text-[#0b1528] bg-white border border-[#cbd5e1] rounded-lg outline-none transition-colors focus:border-[#005ce6] focus:ring-2 focus:ring-[#005ce6]/15"
            />
          </div>

          {/* Поле Пароль */}
          <div>
            <label
              htmlFor="password"
              className="block text-[14px] font-semibold text-[#0b1528] mb-2"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              className="w-full h-11 px-3.5 text-[15px] text-[#0b1528] bg-white border border-[#cbd5e1] rounded-lg outline-none transition-colors focus:border-[#005ce6] focus:ring-2 focus:ring-[#005ce6]/15 tracking-widest"
            />
          </div>

          {/* Кнопка отправки */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#005ce6] hover:bg-[#004ec4] active:bg-[#0042a6] text-white font-semibold text-[15px] rounded-lg transition-colors cursor-pointer"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
