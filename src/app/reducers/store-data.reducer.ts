import {StoreData, INITIAL_STORE_DATA} from "../store/store-data";
import {
  LOAD_USER_THREADS_SUCCESS, LoadUserThreadsSuccess, SEND_NEW_MESSAGE_ACTION, SendNewMessage,
  NEW_MESSAGES_RECEIVED_ACTION, NewMessagesReceivedAction, THREAD_SELECTED_ACTION, ThreadSelectedAction
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
    case NEW_MESSAGES_RECEIVED_ACTION:
      return newMessagesReceivedAction(state, action);
    case THREAD_SELECTED_ACTION:
      return threadSelectedAction(state, action);
    default:
      return state;
  }
}

function threadSelectedAction(state: StoreData, action: ThreadSelectedAction) {
  const cloneState = cloneDeep(state);
  cloneState.threads[action.payload.currentThreadId].participants[action.payload.currentUserId] = 0;
  return cloneState;
}


function newMessagesReceivedAction(state: StoreData, action: NewMessagesReceivedAction) {
  const cloneState = {
    participants: state.participants, // no need to update this, since it won't change from here
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };
  const newMessages = action.payload.unreadMessages,
    currentThreadId = action.payload.currentThreadId,
    currentUserId = action.payload.currentUserId;

  newMessages.forEach(message => {
    cloneState.messages[message.id] = message;

    // First clone 'cloneState.threads[message.threadId]',
    // create a new reference
    cloneState.threads[message.threadId] =
      Object.assign({}, state.threads[message.threadId]);

    // Then assign new reference to new variable
    const messageThread = cloneState.threads[message.threadId];

    messageThread.messageIds = [
      ...messageThread.messageIds,
      message.id
    ];

    if (message.threadId !== currentThreadId) {
      messageThread.participants = Object.assign({}, messageThread.participants);
      messageThread.participants[currentUserId] += 1;
    }
  });

  return cloneState;
}

function handleLoadUserThreadsAction(state: StoreData = INITIAL_STORE_DATA, action: LoadUserThreadsSuccess): StoreData {
  return {
    participants: keyBy(action.payload.participants, 'id'),
    messages: keyBy(action.payload.messages, 'id'),
    threads: keyBy(action.payload.threads, 'id')
  }
}

function sendNewMessageAction(state: StoreData, action: SendNewMessage): StoreData {
  const cloneState = {
    participants: state.participants, // no need to update this, since it won't change from here
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };

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

  // Object.assign doesn't do a deep clone,
  // So we need to do a shadow copy again for 'currentThread.messageIds'
  // for immutability reason.
  currentThread.messageIds = [
    ...currentThread.messageIds.slice(0),
    newMessage.id
  ];

  cloneState.messages[newMessage.id] = newMessage;

  return cloneState;
}
