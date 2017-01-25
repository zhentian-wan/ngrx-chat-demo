import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ThreadSummary} from "../model/threadSummary.interface";

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummary[];

  @Input()
  selectedId: number;

  @Output()
  selectedThread: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onThreadClick(id: number): void{
    this.selectedThread.emit(id);
  }

  ngOnInit() {
  }

}
