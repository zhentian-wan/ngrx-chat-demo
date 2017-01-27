import { Injectable } from '@angular/core';
import {Actions, Effect} from "@ngrx/effects";
import {ThreadsService} from "../../services/threads.service";
import {THREAD_SELECTED_ACTION, ThreadSelectedAction} from "../actions";

@Injectable()
export class MarkUnreadMessageReadEffectService {

  constructor(private action$: Actions, private threadService: ThreadsService) { }

  @Effect({dispatch: false}) markUnreadMessage$ = this.action$
    .ofType(THREAD_SELECTED_ACTION)
    .switchMap((action: ThreadSelectedAction) => this.threadService.markUnreadMessage(
      action.payload.currentUserId,
      action.payload.currentThreadId));
}
