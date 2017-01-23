import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule, combineReducers} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {UserSelectionModule} from "./user-selection/user-selection.module";
import {ThreadSectionModule} from "./thread-section/thread-section.module";
import {MessageSectionModule} from "./message-section/message-section.module";
import {ThreadsService} from "./services/threads.service";

const rootReducer = combineReducers({});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    UserSelectionModule,
    ThreadSectionModule,
    MessageSectionModule
  ],
  providers: [
    ThreadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
