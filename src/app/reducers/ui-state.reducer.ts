
import {INITIAL_UI_STATE, UiState} from "../store/ui-state";
import {
  THREAD_SELECTED_ACTION, ThreadSelectedAction, USER_SELECTED_ACTION,
  ThreadSelectedActionPayload
} from "../store/actions";
import {Action} from "@ngrx/store";

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch(action.type) {
    case THREAD_SELECTED_ACTION:
      return setCurrentSelectedID(state, action.payload);
    case USER_SELECTED_ACTION:
      return userSelectedAction(state, action.payload);
    default:
      return state;
  }
}


function setCurrentSelectedID(state: UiState, payload: ThreadSelectedActionPayload) {
  return Object.assign({}, state, {
    currentSelectedID: payload.currentThreadId
  })
}

function userSelectedAction(state: UiState, id: number) {
  return Object.assign({}, state, {
    currentSelectedID: undefined,
    userId: id
  })
}
