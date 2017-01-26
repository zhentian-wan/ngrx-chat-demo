import { Injectable } from '@angular/core';
import {ThreadsService} from "../../services/threads.service";
import {Observable} from "rxjs";
import {Action} from '@ngrx/store';
import {Effect, Actions} from "@ngrx/effects";
import {SEND_NEW_MESSAGE_ACTION} from "../actions";

@Injectable()
export class SaveNewMessageEffectService {

  constructor(private action$: Actions, private threadService: ThreadsService) {

  }

  // {dispatch: false}: no need to further trigger action
  @Effect({dispatch: false}) saveMessage$: Observable<Action> = this.action$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .switchMap((action) => this.threadService.saveNewMessage(action.payload));

}
