import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {MessageVM} from "../../model/message-vm.interface";

@Component({
  selector: 'message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {

  @Input() message: MessageVM;
}
