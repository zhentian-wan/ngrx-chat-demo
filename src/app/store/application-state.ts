
import {StoreData, INITIAL_STORE_DATA} from "./store-data";
import {UiState, INITIAL_UI_STATE} from "./ui-state";
export interface AppState {
  uiState: UiState,
  storeData: StoreData
}

export const INITIAL_APPLICATION_STATE: AppState = {
  uiState: INITIAL_UI_STATE,
  storeData: INITIAL_STORE_DATA
};
