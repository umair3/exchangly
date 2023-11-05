import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ImportType = "Copy and Paste";
interface IImport {
  type: ImportType;
  copyPaste: string[];
}
interface IOrganize {
  status: string;
}

interface ITag {
  selectedTags: string[];
}

interface IImportContactsState {
  import: IImport;
  organize: IOrganize;
  tag: ITag;
}

const initialState: IImportContactsState = {
  import: {
    type: "Copy and Paste",
    copyPaste: [],
  },

  organize: {
    status: "",
  },
  tag: {
    selectedTags: [],
  },
};

const ImportContactsSlice = createSlice({
  name: "Import Contacts",
  initialState,
  reducers: {
    resetImportContactsState: (state) => {
      return initialState;
    },

    setImport(state, action: PayloadAction<IImport>) {
      state.import.copyPaste = action.payload.copyPaste;
    },
    setOrganize(state, action: PayloadAction<IOrganize>) {
      state.organize.status = action.payload.status;
    },

    setTag(state, action: PayloadAction<ITag>) {
      state.tag.selectedTags = action.payload.selectedTags;
    },
    setPopularTag(state, action: PayloadAction<string>) {
      state.tag.selectedTags.push(action.payload);
    },
  },
});

export const {
  resetImportContactsState,
  setImport,
  setOrganize,
  setTag,
  setPopularTag,
} = ImportContactsSlice.actions;

export default ImportContactsSlice.reducer;
