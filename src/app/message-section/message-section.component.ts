import {Component, OnInit} from '@angular/core';
import {AppState} from "../store/application-state";
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";

import {keys} from 'ramda';
import {MessageVM} from "./model/message-vm.interface";

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  constructor(private store: Store<AppState>) {
    this.participantNames$ = store.select(this.participantNamesSelector);
    this.messages$ = store.select(this.messageSelector.bind(this));
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
}
