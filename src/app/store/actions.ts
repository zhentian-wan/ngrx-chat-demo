

import {AllUserData} from "../../../shared/to/all-user-data";
import {Action} from "@ngrx/store";
import {Message} from "../../../shared/model/message.interface";

export const LOAD_USER_THREADS_ACTION = "LOAD_USER_THREADS_ACTION";
export const LOAD_USER_THREADS_SUCCESS = "LOAD_USER_THREADS_SUCCESS";
export const THREAD_SELECTED_ACTION = "THREAD_SELECTED_ACTION";
export const USER_SELECTED_ACTION = "USER_SELECTED_ACTION";
export const SEND_NEW_MESSAGE_ACTION = "SEND_NEW_MESSAGE_ACTION";
export const NEW_MESSAGES_RECEIVED_ACTION = "NEW_MESSAGES_RECEIVED_ACTION";


export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_THREADS_ACTION;

  constructor(public payload?: number) {}
}

export class LoadUserThreadsSuccess implements Action {
  readonly type = LOAD_USER_THREADS_SUCCESS;

  constructor(public payload?: AllUserData) {

  }
}

export class ThreadSelectedAction implements Action {
  readonly type = THREAD_SELECTED_ACTION;

  constructor(public payload?: number){}
}

export class UserSelectedAction implements Action {
  readonly type = USER_SELECTED_ACTION;

  constructor(public payload?: number){}
}


export interface SEND_NEW_MESSAGE_PAYLOAD {
  text: string;
  threadId: number;
  participantId: number;
}

export class SendNewMessage implements Action {
  readonly type = SEND_NEW_MESSAGE_ACTION;

  constructor(public payload?: SEND_NEW_MESSAGE_PAYLOAD) {}
}


export interface NewMessagesReceivedActionPayload {
  unreadMessages: Message[];
  currentUserId: number;
  currentThreadId: number;
}

export class NewMessagesReceivedAction implements Action {
  readonly type = NEW_MESSAGES_RECEIVED_ACTION;

  constructor(public payload?: NewMessagesReceivedActionPayload) {}
}
