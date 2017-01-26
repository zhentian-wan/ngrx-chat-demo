import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {ThreadsService} from "../../services/threads.service";

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import {AppState} from "../application-state";
import {Effect} from "@ngrx/effects";
import {NewMessagesReceivedAction} from "../actions";

@Injectable()
export class RefreshMessageListEffectService {

  constructor(private threadService: ThreadsService, private store: Store<AppState>) { }

  @Effect() newMessages$: Observable<Action> = Observable.interval(3000)
    .withLatestFrom(this.store.select("uiState"))
    .map(([_, uiState]) => uiState)
    .filter((uiState) => uiState['userId'])
    .switchMap((uiState) => this.threadService.loadNewMessages(uiState['userId']))
    .map((messages) => new NewMessagesReceivedAction(messages))

}
