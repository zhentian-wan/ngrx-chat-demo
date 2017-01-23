import {AppState, INITIAL_APPLICATION_STATE} from "../store/application-state";
import {Action} from "@ngrx/store";
import {LOAD_USER_THREADS_ACTION} from "../store/actions";
import {indexBy, prop} from "ramda";


export function storeReducer(state: AppState = INITIAL_APPLICATION_STATE, action: Action): AppState {

  switch(action.type) {
    case LOAD_USER_THREADS_ACTION:
          return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: AppState, action: Action): AppState {
  const userData = action.payload;
  const storeData = {
    participants: indexBy(prop('id'), action.payload.participants),
    messages: indexBy(prop('id'), action.payload.messages),
    threads: indexBy(prop('id'), action.payload.threads)
  };
  return Object.assign({}, state, ...userData, {storeData});
}
