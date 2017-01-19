import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionComponent } from './user-selection.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UserSelectionComponent
  ],
  declarations: [UserSelectionComponent]
})
export class UserSelectionModule { }
