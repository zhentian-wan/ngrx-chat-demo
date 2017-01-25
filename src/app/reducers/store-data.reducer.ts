
import {StoreData, INITIAL_STORE_DATA} from "../store/store-data";
import {LOAD_USER_THREADS_SUCCESS, LoadUserThreadsSuccess} from "../store/actions";
import {keyBy} from 'lodash';
import {Action} from '@ngrx/store';

export function uiStoreDataReducer(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
  switch(action.type) {
    case LOAD_USER_THREADS_SUCCESS:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: StoreData = INITIAL_STORE_DATA, action: LoadUserThreadsSuccess): StoreData {
  return {
    participants: keyBy(action.payload.participants, 'id'),
    messages: keyBy(action.payload.messages, 'id'),
    threads: keyBy(action.payload.threads, 'id')
  }
}
