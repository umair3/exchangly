import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import * as actions from "./actions";

export function useUserActions() {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
}
