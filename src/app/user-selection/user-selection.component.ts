import { Component, OnInit } from '@angular/core';
import {AppState} from "../store/application-state";
import {UserSelectedAction} from "../store/actions";
import {Store} from '@ngrx/store';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent {

  constructor(private store: Store<AppState>) { }

  onSelectUser(userId: number): void {
    this.store.dispatch(new UserSelectedAction(userId));
  }
}
