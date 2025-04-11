import { jwtDecode, JwtPayload } from 'jwt-decode';

const TOKEN_KEY = 'id_token';

class AuthService {
  // Decode and return the token’s payload (or null if no valid token)
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (err) {
      console.error('Failed to decode JWT:', err);
      return null;
    }
  }

  // Returns true if there’s a non‑expired token
  loggedIn(): boolean {
    const token = this.getToken();
    return Boolean(token) && !this.isTokenExpired(token);
  }

  // Returns true if the token’s exp timestamp is in the past
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false;
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error('Failed to decode JWT for expiry check:', err);
      return true;
    }
  }

  // Read the token from localStorage
  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  // Save the token and redirect to the app’s “home” (Kanban board)
  login(idToken: string): void {
    localStorage.setItem(TOKEN_KEY, idToken);
    window.location.href = '/';
  }

  // Remove the token and redirect to login
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/login';
  }
}

export default new AuthService();

