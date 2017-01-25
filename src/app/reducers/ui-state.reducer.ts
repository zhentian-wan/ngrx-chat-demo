

import {Action} from '@ngrx/store';
import {INITIAL_UI_STATE, UiState} from "../store/ui-state";

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch(action.type) {
    default:
      return state;
  }
}
