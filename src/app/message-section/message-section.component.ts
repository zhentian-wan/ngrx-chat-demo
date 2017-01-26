import {Component, OnInit, Input} from '@angular/core';
import {AppState} from "../store/application-state";
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";

import {keys} from 'ramda';
import {MessageVM} from "./model/message-vm.interface";
import {SendNewMessage, SEND_NEW_MESSAGE_PAYLOAD} from "../store/actions";
import {UiState} from "../store/ui-state";

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
    this.participantNames$ = store.select(this.participantNamesSelector);
    this.messages$ = store.select(this.messageSelector.bind(this));
    store.subscribe(state => this.uiState = Object.assign({}, state.uiState));
  }

  messageSelector(state: AppState): MessageVM[] {
    const {currentSelectedID} = state.uiState;
    if (!currentSelectedID) {
      return [];
    }
    const messageIds = state.storeData.threads[currentSelectedID].messageIds;
    const messages = messageIds.map(id => state.storeData.messages[id]);
    return messages.map((message) => this.mapMessageToMessageVM(message, state));
  }

  mapMessageToMessageVM(message, state): MessageVM {
    return {
      id: message.id,
      text: message.text,
      participantName: (state.storeData.participants[message.participantId].name || ''),
      timestamp: message.timestamp
    }
  }

  participantNamesSelector(state: AppState): string {
    const {currentSelectedID} = state.uiState;
    if (!currentSelectedID) {
      return "";
    }
    const participantIds = keys(
      state.storeData.threads[currentSelectedID].participants
    );
    return participantIds
      .map((pId) => state.storeData.participants[pId].name)
      .join(', ');
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
