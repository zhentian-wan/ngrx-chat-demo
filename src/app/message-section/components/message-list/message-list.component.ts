import {Component, Input, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
import {last} from 'lodash';

@Component({
  selector: 'message-list',
  templateUrl: 'message-list.component.html',
  styleUrls: ['message-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnChanges{

  @Input() messages;

  @ViewChild('list') list;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['messages']) {
      const previous = changes['messages'].previousValue;
      const current = changes['messages'].currentValue;
      if(previous.length < current.length) {
        setTimeout(() => this.scrollToBottom());
      }
    }
  }

  scrollToBottom(): void {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = last(items);
    lastItem.scrollIntoView();
  }
}
