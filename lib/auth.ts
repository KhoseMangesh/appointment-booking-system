// Client-side authentication helper
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('userId');
}

export function getUserRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('role');
}

export function getUserName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('name');
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  window.location.href = '/';
}