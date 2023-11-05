import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILabelValue<valueType = string> {
  label: valueType;
  value: valueType;
}

export type IFilterByStatus = ILabelValue | null;

interface IAudienceState {
  filterByStatus: IFilterByStatus;
  filterByTags: ILabelValue[];
}

const initialState: IAudienceState = {
  filterByStatus: null,
  filterByTags: [],
};

const AudienceSlice = createSlice({
  name: "Audience",
  initialState,
  reducers: {
    resetAudienceState: (_state) => {
      return initialState;
    },

    setStatusFilter: (state, action: PayloadAction<IFilterByStatus>) => {
      state.filterByStatus = action.payload;
    },

    setTagFilter: (state, action: PayloadAction<ILabelValue[]>) => {
      state.filterByTags = action.payload;
    },
  },
});

export const { resetAudienceState, setStatusFilter, setTagFilter } =
  AudienceSlice.actions;

export default AudienceSlice.reducer;
