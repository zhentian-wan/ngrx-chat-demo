import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ThreadsService} from "../services/threads.service";
import {AppState} from "../store/application-state";

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private threadsService: ThreadsService) {

  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
      .subscribe((data) => {
        console.log(data);
      })
  }

}
