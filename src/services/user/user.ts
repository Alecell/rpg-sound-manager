import { CookieService } from '../cookie/cookie';

export class UserService {
  static getToken(): string {
    return CookieService.get('userId');
  }
}
