/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This is a work around to type an empty object
 */
export type TEmptyObject = {
  [K in any] : never
};
