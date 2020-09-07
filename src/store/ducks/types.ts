export type IData<Type> = {
  [key: string]: Type;
};

export interface IDataRequestState<PayloadType> {
  data: IData<PayloadType>;
  loading: boolean;
  error: boolean;
}

export interface IRequestState {
  loading: boolean;
  error: boolean;
}

export type RequestState<
  StateType = void
> = StateType extends void ? IRequestState : IDataRequestState<StateType>;
