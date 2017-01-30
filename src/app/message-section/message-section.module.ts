import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageSectionComponent } from './message-section.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MessageSectionComponent
  ],
  declarations: [MessageSectionComponent, MessageListComponent, MessageComponent]
})
export class MessageSectionModule { }
