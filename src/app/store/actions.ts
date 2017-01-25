

import {AllUserData} from "../../../shared/to/all-user-data";
import {Action} from "@ngrx/store";

export const LOAD_USER_THREADS_ACTION = "LOAD_USER_THREADS_ACTION";
export const LOAD_USER_THREADS_SUCCESS = "LOAD_USER_THREADS_SUCCESS";
export const THREAD_SELECTED_ACTION = "THREAD_SELECTED_ACTION";

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_THREADS_ACTION;
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
