import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ThreadsService} from "../services/threads.service";
import {AppState} from "../store/application-state";
import {AllUserData} from "../../../shared/to/all-user-data";
import {LoadUserThreadsAction} from "../store/actions";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import {values} from 'ramda';
import {Thread} from "../../../shared/model/thread.interface";


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  counterOfUnreadMessages$: Observable<number>;

  constructor(private store: Store<AppState>,
              private threadsService: ThreadsService) {

    this.userName$ = store
      .skip(1) // skip the initial value
      .map(this.mapStateToUsername);

    this.counterOfUnreadMessages$ = store
      .skip(1)
      .map(this.mapStateToUnreadMessages);
  }

  mapStateToUsername(state: AppState): string {
    return state.storeData.participants[state.uiState.userId].name;
  }

  mapStateToUnreadMessages(state: AppState): number {
    const currentUserId: number = state.uiState.userId;
    return values<Thread>(state.storeData.threads)
      .reduce(
        (acc: number, thread) => acc + thread.participants[currentUserId]
        , 0);
  }

  ngOnInit() {

    this.threadsService.loadUserThreads()
      .subscribe((allUserData: AllUserData) => {
        this.store.dispatch(new LoadUserThreadsAction(allUserData))
      });
  }

}
