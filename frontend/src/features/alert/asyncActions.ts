import { v4 as uuidv4 } from "uuid";

import { IAlertState, removeAlert, setAlert, setInitialAlertState } from ".";
import { AppThunk, store } from "../../app/store";

interface ISetAlert extends Omit<IAlertState, "id"> {
  timeout?: number;
  clear?: boolean;
}

export const setupAlert =
  ({ message, status, timeout = 6000, clear = false }: ISetAlert): AppThunk =>
  (dispatch) => {
    if (clear) {
      dispatch(setInitialAlertState());
    }

    const id = uuidv4();

    dispatch(
      setAlert({
        id,
        message,
        status,
      })
    );

    setTimeout(() => dispatch(removeAlert(id)), timeout);
  };

export const ShowAlert = (props: ISetAlert) => {
  store.dispatch(setupAlert(props));
};

export const RemoveAllAlerts = () => {
  store.dispatch(setInitialAlertState());
};
