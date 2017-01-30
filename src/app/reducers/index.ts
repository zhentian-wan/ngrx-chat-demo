import {AppState, INITIAL_APPLICATION_STATE} from "../store/application-state";
import {Action, combineReducers} from "@ngrx/store";
import {uiStoreDataReducer} from "./store-data.reducer";
import {uiStateReducer} from "./ui-state.reducer";
import {routerReducer} from "@ngrx/router-store";


export function rootReducers(state: AppState = INITIAL_APPLICATION_STATE, action: Action) {

  const rootReducers: AppState = {
    uiState: uiStateReducer(state.uiState, action),
    storeData: uiStoreDataReducer(state.storeData, action),
    router: routerReducer(state.router, action)
  };
  return rootReducers;
}




