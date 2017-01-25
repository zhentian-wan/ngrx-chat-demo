
import {INITIAL_UI_STATE, UiState} from "../store/ui-state";
import {THREAD_SELECTED_ACTION, ThreadSelectedAction} from "../store/actions";

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: ThreadSelectedAction): UiState {
  switch(action.type) {
    case THREAD_SELECTED_ACTION:
      return setCurrentSelectedID(state, action.payload);
    default:
      return state;
  }
}


function setCurrentSelectedID(state: UiState, id: number) {
  return Object.assign({}, state, {
    currentSelectedID: id
  })
}
