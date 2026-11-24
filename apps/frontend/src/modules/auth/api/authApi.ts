interface LoginData {
  login: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    login: string;
    displayName: string;
  };
  expiresAt: string;
}

const mockUser = {
  id: '1',
  login: 'trainee1',
  password: 'example-password',
  displayName: 'Trainee',
};

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (data.login !== mockUser.login || data.password !== mockUser.password) {
    throw new Error('Неверный логин или пароль');
  }

  return {
    user: {
      id: mockUser.id,
      login: mockUser.login,
      displayName: mockUser.displayName,
    },
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };
}
