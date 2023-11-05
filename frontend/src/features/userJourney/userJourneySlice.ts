import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserJourneyState {
  searchEmail: string;
}

const initialState: IUserJourneyState = {
  searchEmail: "",
};

const userJourneySlice = createSlice({
  name: "userJourney",
  initialState,
  reducers: {
    setSearchEmail: (state, action: PayloadAction<string>) => {
      state.searchEmail = action.payload;
    },
    resetJourneyState: (_state) => {
      return initialState;
    },
  },
});

export const { setSearchEmail, resetJourneyState } = userJourneySlice.actions;

export default userJourneySlice.reducer;
