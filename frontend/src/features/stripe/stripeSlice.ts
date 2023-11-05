import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICardElement {
  completed: boolean;
  error: null | string;
}

export interface IStripeState {
  cardElement: ICardElement | null;
}

const initialState: IStripeState = {
  cardElement: null,
};

export const StripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    setCardElement: (state, action: PayloadAction<ICardElement>) => {
      state.cardElement = action.payload;
    },

    removeCardElement: (state) => {
      state.cardElement = null;
    },
  },
});

export const { setCardElement, removeCardElement } = StripeSlice.actions;

export default StripeSlice.reducer;
