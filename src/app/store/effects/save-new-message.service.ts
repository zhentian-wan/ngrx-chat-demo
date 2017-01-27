import { Injectable } from '@angular/core';
import {ThreadsService} from "../../services/threads.service";
import {Observable} from "rxjs";
import {Effect, Actions} from "@ngrx/effects";
import 'rxjs/add/operator/catch';
import {SEND_NEW_MESSAGE_ACTION, ErrorMessageAction} from "../actions";

@Injectable()
export class SaveNewMessageEffectService {

  constructor(private action$: Actions, private threadService: ThreadsService) {

  }

  @Effect() saveMessage$: Observable<any> = this.action$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .switchMap((action) => this.threadService.saveNewMessage(action.payload))
    .catch(() => Observable.of("cannot send new message").map((msg: string) => new ErrorMessageAction(msg)));

}
