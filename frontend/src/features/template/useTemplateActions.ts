import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import * as actions from "./actions";

export function useTemplateActions() {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
}
