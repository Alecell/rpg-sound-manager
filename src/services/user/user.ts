import { CookieService } from '../cookie';

export class UserService {
  static getToken(): string {
    return CookieService.get('userId');
  }
}
