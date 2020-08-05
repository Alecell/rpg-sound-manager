export type IData<Type> = {
  [key: string]: Type;
};

export interface IRequestState<PayloadType> {
  data: IData<PayloadType>;
  loading: boolean;
  error: boolean;
}
