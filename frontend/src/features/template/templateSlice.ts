import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../components/Templates/TemplateItem";

export interface ITemplateState {
  selectedForDetail: ITemplateItem | null;
}

const initialState: ITemplateState = {
  selectedForDetail: null,
};

export const TemplateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    updateTemplateDetail: (
      state,
      action: PayloadAction<ITemplateItem | null>
    ) => {
      state.selectedForDetail = action.payload;
    },

    resetTemplateState: (_state) => {
      return initialState;
    },
  },
});

export const { resetTemplateState, updateTemplateDetail } =
  TemplateSlice.actions;

export default TemplateSlice.reducer;
