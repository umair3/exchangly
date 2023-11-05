import { AxiosError, AxiosResponse } from "axios";

export interface ICallbacks<T> {
  onFinally?: () => void;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export interface IAPI<T> extends ICallbacks<T> {
  call: () => Promise<AxiosResponse<any, any> | AxiosError<any, any>>;
}

export async function CallAPI<Response extends Partial<AxiosResponse>>(
  props: IAPI<Response>
) {
  const { call, onFinally, onSuccess, onError } = props;
  try {
    const response = (await call()) as Response;
    onSuccess && onSuccess(response);
  } catch (error) {
    onError && onError(error);
  } finally {
    onFinally && onFinally();
  }
}
