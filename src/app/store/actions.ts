

import {AllUserData} from "../../../shared/to/all-user-data";
import {Action} from "@ngrx/store";
export const LOAD_USER_THREADS_ACTION = "LOAD_USER_THREADS_ACTION";

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_THREADS_ACTION;

  constructor(public payload: AllUserData) {

  }
}
