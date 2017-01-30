import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from "../store/application-state";
import {ThreadSelectedAction} from "../store/actions";
import {Observable} from "rxjs";
import {values, keys, last} from 'ramda';
import {Thread} from "../../../shared/model/thread.interface";
import {ThreadSummary} from "./model/threadSummary.interface";
import {UiState} from "../store/ui-state";
import {userNameSelector} from "./selctors/user-name.selector";
import {unreadMessageCounterSelector} from "./selctors/counter-of-unread-messages.selector";
import {mapStateToThreadSummarySelector} from "./selctors/thread-summary.selector";

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  counterOfUnreadMessages$: Observable<number>;
  threadSummary$: Observable<ThreadSummary[]>;
  uiState: UiState;

  constructor(private store: Store<AppState>) {

    this.userName$ = store.select(userNameSelector);

    this.counterOfUnreadMessages$ = store.select(unreadMessageCounterSelector);

    this.threadSummary$ = store.select(mapStateToThreadSummarySelector);

    store.select("uiState").subscribe((uiState: UiState) => this.uiState = uiState);
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction({
      currentThreadId: selectedThreadId,
      currentUserId: this.uiState.userId
    }));
  }
}
