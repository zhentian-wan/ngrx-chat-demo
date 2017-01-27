import {INITIAL_UI_STATE, UiState} from "../store/ui-state";
import {
  THREAD_SELECTED_ACTION, USER_SELECTED_ACTION,
  ThreadSelectedActionPayload, ERROR_MESSAGE_ACTION
} from "../store/actions";
import {Action} from "@ngrx/store";

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {
    case THREAD_SELECTED_ACTION:
      return setCurrentSelectedID(state, action.payload);
    case USER_SELECTED_ACTION:
      return userSelectedAction(state, action.payload);
    case ERROR_MESSAGE_ACTION:
      return errorMessageAction(state, action.payload);
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

function errorMessageAction(state: UiState, errorMsg: string) {
  return Object.assign({}, state, {
    errorMsg
  })
}
