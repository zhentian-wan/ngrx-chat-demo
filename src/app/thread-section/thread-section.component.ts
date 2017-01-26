import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from "../store/application-state";
import {ThreadSelectedAction} from "../store/actions";
import {Observable} from "rxjs";
import {values, keys, last} from 'ramda';
import {Thread} from "../../../shared/model/thread.interface";
import {ThreadSummary} from "./model/threadSummary.interface";


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  counterOfUnreadMessages$: Observable<number>;
  threadSummary$: Observable<ThreadSummary[]>;
  currentSelectedThreadId$: Observable<number>;

  constructor(private store: Store<AppState>) {

    this.userName$ = store.select(this.userNameSelector);

    this.counterOfUnreadMessages$ = store.select(this.unreadMessageCounterSelector);

    this.threadSummary$ = store.select(this.mapStateToThreadSummarySelector.bind(this));

    this.currentSelectedThreadId$ = store.select(state => state.uiState.currentSelectedID);
  }

  mapStateToThreadSummarySelector(state: AppState): ThreadSummary[] {
    const threads = values<Thread>(state.storeData.threads);
    return threads.map((thread) => this.mapThreadToThreadSummary(thread, state));
  }

  mapThreadToThreadSummary(thread: Thread, state: AppState): ThreadSummary {
    const names: string = keys(thread.participants)
      .map(participantId => state.storeData.participants[participantId].name)
      .join(', ');
    const lastMessageId: number = last(thread.messageIds);
    const lastMessage = state.storeData.messages[lastMessageId];
    return {
      id: thread.id,
      participants: names,
      lastMessage: lastMessage.text,
      timestamp: lastMessage.timestamp
    };
  }

  userNameSelector(state: AppState): string {
    const currentUserId = state.uiState.userId;
    const currentParticipant = state.storeData.participants[currentUserId];

    if (!currentParticipant) {
      return "";
    }

    return currentParticipant.name;
  }

  unreadMessageCounterSelector(state: AppState): number {
    const currentUserId: number = state.uiState.userId;

    if (!currentUserId) {
      return 0;
    }

    return values<Thread>(state.storeData.threads)
      .reduce(
        (acc: number, thread) => acc + (thread.participants[currentUserId] || 0)
        , 0);
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }
}
