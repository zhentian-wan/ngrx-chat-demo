import {AppState, INITIAL_APPLICATION_STATE} from "../store/application-state";
import {Action} from "@ngrx/store";
import {uiStoreDataReducer} from "./store-data.reducer";
import {uiStateReducer} from "./ui-state.reducer";


export function rootReducers(state: AppState = INITIAL_APPLICATION_STATE, action: Action): AppState {
  return {
    uiState: uiStateReducer(state.uiState, action),
    storeData: uiStoreDataReducer(state.storeData, action)
  };
}




