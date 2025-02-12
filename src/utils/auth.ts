import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    const token = this.getToken();
    try {
      return jwtDecode<UserData>(token);
    } catch (error) {
      return null;
    }
  }
    

  loggedIn() {
    const token = this.getToken();
    // Check if there is a token and if it is not expired
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp < Date.now() / 1000;
      }
      return false;
    } catch (error) {
      return true;
    }
  }
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
