import { Component, OnInit } from '@angular/core';
import * as R from 'ramda';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  number = 1;
  constructor() { }

  ngOnInit() {
    this.number = R.multiply(2, this.number);
  }

}
