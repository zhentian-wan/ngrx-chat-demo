import {Component} from '@angular/core';
import {AppState} from "../store/application-state";
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";

import {MessageVM} from "./model/message-vm.interface";
import {SendNewMessage} from "../store/actions";
import {UiState} from "../store/ui-state";
import {messageSelector} from "./selectors/messages.selector";
import {participantNamesSelector} from "./selectors/participant-names.selector";

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;
  uiState: UiState;

  constructor(private store: Store<AppState>) {
    this.participantNames$ = store.select(participantNamesSelector);
    this.messages$ = store.select(messageSelector);
    store.subscribe(state => this.uiState = Object.assign({}, state.uiState));
  }

  onSendNewMessage(input: any): void {
    if(!this.uiState.currentSelectedID) {
      return;
    }
    const payload = {
      text: input.value,
      threadId: this.uiState.currentSelectedID,
      participantId: this.uiState.userId
    };
    this.store.dispatch(new SendNewMessage(payload));
    input.value = "";
  }
}
