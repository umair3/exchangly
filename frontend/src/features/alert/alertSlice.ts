import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAlertState {
  id: string;
  message: string;
  status: "success" | "error" | "info" | "warning";
}

const initialState: IAlertState[] = [];

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlertState>) => {
      if (state.length < 3) {
        state.push(action.payload);
      }
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      return state.filter((alert) => alert.id !== action.payload);
    },

    setInitialAlertState: (_state) => {
      return initialState;
    },
  },
});

export const { setAlert, removeAlert, setInitialAlertState } =
  AlertSlice.actions;

export default AlertSlice.reducer;
