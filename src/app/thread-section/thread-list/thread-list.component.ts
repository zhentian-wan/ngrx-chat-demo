import {Component, OnInit, Input} from '@angular/core';
import {ThreadSummary} from "../model/threadSummary.interface";

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummary[];
  constructor() { }

  ngOnInit() {
  }

}
