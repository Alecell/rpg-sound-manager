import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();

export class CookieService {
  static getUserToken = (): string => cookieStorage.getItem('userId') ?? '';
}
