import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from "../store/application-state";
import {UiState} from "../store/ui-state";

@Component({
  selector: 'error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  message: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select<UiState>(state => state.uiState)
      .subscribe(uiState => this.message = uiState.errorMsg);
  }

  close() {
    this.message = null;
  }

}
