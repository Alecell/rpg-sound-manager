import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();

export class CookieService {
  static get = (itemName: string): string => cookieStorage.getItem(itemName) ?? '';
}
