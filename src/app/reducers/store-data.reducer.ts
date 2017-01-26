import {StoreData, INITIAL_STORE_DATA} from "../store/store-data";
import {
  LOAD_USER_THREADS_SUCCESS, LoadUserThreadsSuccess, SEND_NEW_MESSAGE_ACTION, SendNewMessage
} from "../store/actions";
import {keyBy, cloneDeep} from 'lodash';
import {Action} from '@ngrx/store';
import {Message} from "../../../shared/model/message.interface";

const uuid = require('uuid/V4');

export function uiStoreDataReducer(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
  switch (action.type) {
    case LOAD_USER_THREADS_SUCCESS:
      return handleLoadUserThreadsAction(state, action);
    case SEND_NEW_MESSAGE_ACTION:
      return sendNewMessageAction(state, action);
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

function sendNewMessageAction(state: StoreData, action: SendNewMessage): StoreData {

  const cloneState = cloneDeep(state);
  const currentThreadId = action.payload.threadId;
  const currentThread = cloneState.threads[currentThreadId] = Object.assign({}, state.threads[currentThreadId]);

  // Insert an new message into messages
  const newMessage: Message = {
    id: uuid(),
    text: action.payload.text,
    participantId: action.payload.participantId,
    threadId: currentThreadId,
    timestamp: Date.now()
  };

  // Here using .push() because don't want to break currentThread.messageIds's reference
  // And this operation won't mutate origin state
  currentThread.messageIds.push(newMessage.id);

  cloneState.messages[newMessage.id] = newMessage;
  return cloneState;
}
