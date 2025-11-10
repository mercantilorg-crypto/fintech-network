export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

const TOKEN_KEY = 'fintech_token';
const USER_KEY = 'fintech_user';

export const setSession = (token: string, user: AuthUser): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch (error) {
    console.error('Failed to parse stored user', error);
    return null;
  }
};
