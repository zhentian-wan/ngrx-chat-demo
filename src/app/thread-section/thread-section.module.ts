import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadSectionComponent } from './thread-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ThreadSectionComponent
  ],
  declarations: [ThreadSectionComponent, ThreadListComponent]
})
export class ThreadSectionModule { }
