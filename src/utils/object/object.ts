import { GenericObject } from 'interfaces/genericObject';

export class ObjectUtil {
  static appendOnEveryChild<T>(
    source: GenericObject,
    destination: GenericObject,
  ): T {
    return Object.keys(source).reduce((acc, value) => ({
      ...acc,
      [value]: {
        ...source[value],
        ...destination,
      },
    }), {} as T);
  }

  static hasKey(obj: GenericObject, key: string | number) {
    return Object.keys(obj).some((value: string) => value === key);
  }
}
