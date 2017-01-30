import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ThreadSummary} from "../model/threadSummary.interface";

@Component({
  selector: 'thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadComponent {

  @Input() thread: ThreadSummary;
}
