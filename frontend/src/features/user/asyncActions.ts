import { removeCurrentUser } from ".";
import { AppThunk } from "../../app/store";
import { IUserProfileResponseAPI, UserService } from "../../services/Api/User";
import { CallAPI, ICallbacks } from "../../utils/CallAPI";
import { setCurrentUser } from "./userSlice";

export const getUserProfile =
  (props: ICallbacks<IUserProfileResponseAPI>): AppThunk =>
  (dispatch) => {
    CallAPI<IUserProfileResponseAPI>({
      call: UserService.getProfile,
      onError: props.onError,
      onFinally: () => {
        props.onFinally && props.onFinally();
      },
      onSuccess: (response) => {
        if (response.data) {
          dispatch(setCurrentUser(response.data));
        }
        props.onSuccess && props.onSuccess(response);
      },
    });
  };

export const logoutUser =
  (props: ICallbacks<{ data: any }>): AppThunk =>
  (dispatch) => {
    CallAPI<{ data: any }>({
      call: UserService.logout,
      onError: props.onError,
      onFinally: props.onFinally,
      onSuccess: (response) => {
        if (response.data) {
          dispatch(removeCurrentUser());
        }
      },
    });
  };
