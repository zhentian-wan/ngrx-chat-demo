import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input() messages;
  constructor() { }

  ngOnInit() {
  }

}
