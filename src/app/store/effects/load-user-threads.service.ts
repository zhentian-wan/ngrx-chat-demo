import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from "@ngrx/effects";
import {ThreadsService} from "../../services/threads.service";
import {
  LOAD_USER_THREADS_ACTION, LoadUserThreadsSuccess, USER_SELECTED_ACTION,
  LoadUserThreadsAction
} from "../actions";
import {Observable} from "rxjs";


@Injectable()
export class LoadUserThreadsEffectService {

  constructor(private action$: Actions, private threadsService: ThreadsService) {
  }

  @Effect()
  userThreadsEffect$: Observable<Action> = this.action$
    .ofType(LOAD_USER_THREADS_ACTION)
    .switchMap((action) => this.threadsService.loadUserThreads(action.payload))
    .map((allUserData) => new LoadUserThreadsSuccess(allUserData));

  @Effect()
  userSelectedEffect$: Observable<Action> = this.action$
    .ofType(USER_SELECTED_ACTION)
    .map((action) => new LoadUserThreadsAction(action.payload))
}
