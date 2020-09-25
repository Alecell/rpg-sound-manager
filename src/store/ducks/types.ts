export type Data<Type> = {
  [key: string]: Type;
};

export interface DataRequestState<PayloadType> {
  data: Data<PayloadType>;
  loading: boolean;
  error: boolean;
}

export interface NoDataRequestState {
  loading: boolean;
  error: boolean;
}

export type RequestState<
  StateType = void
> = StateType extends void ? NoDataRequestState : DataRequestState<StateType>;
