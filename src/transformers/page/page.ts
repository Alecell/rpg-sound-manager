import { TEmptyObject } from 'types/emptyObject';
import { TGetState, TListState } from './types';

export class PageTransformer {
  static queryListToApp(pageData: TListState | undefined): TListState {
    return pageData || {};
  }

  static queryGetToApp(pageData: TGetState | TEmptyObject | undefined): TGetState | TEmptyObject {
    return pageData || {};
  }
}
