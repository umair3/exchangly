import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultiValue } from "react-select";
import { ILabelValue } from "../../components/Common/CustomSelect";

type Writeable<T> = {
  -readonly [K in keyof T]: T[K];
};

export interface ICreateCampaignState {
  title: string;
  recipientTags: Writeable<MultiValue<ILabelValue>>;
  senderEmail: string;
  subject: string;
  previewText: string;
  template: string;
}

const initialState: ICreateCampaignState = {
  title: "Untitled",
  recipientTags: [],
  senderEmail: "",
  subject: "",
  previewText: "",
  template: "",
};

export const CreateCampaignSlice = createSlice({
  name: "create-campaign",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateRecipientTags: (
      state,
      action: PayloadAction<MultiValue<ILabelValue>>
    ) => {
      state.recipientTags = action.payload as Writeable<
        MultiValue<ILabelValue>
      >;
    },
    updateSenderEmail: (state, action: PayloadAction<string>) => {
      state.senderEmail = action.payload;
    },
    updateSubjectAndPreviewText: (
      state,
      action: PayloadAction<{ subject: string; previewText: string }>
    ) => {
      state.subject = action.payload.subject;
      state.previewText = action.payload.previewText;
    },

    updateContentTemplate: (state, action: PayloadAction<string>) => {
      {
        state.template = action.payload;
      }
    },

    resetCreateCampaignState: (_state) => {
      return initialState;
    },
  },
});

export const {
  updateTitle,
  updateRecipientTags,
  updateSenderEmail,
  updateSubjectAndPreviewText,
  updateContentTemplate,
  resetCreateCampaignState,
} = CreateCampaignSlice.actions;

export default CreateCampaignSlice.reducer;
