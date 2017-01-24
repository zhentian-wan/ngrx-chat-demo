import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {UserSelectionModule} from "./user-selection/user-selection.module";
import {ThreadSectionModule} from "./thread-section/thread-section.module";
import {MessageSectionModule} from "./message-section/message-section.module";
import {ThreadsService} from "./services/threads.service";

import {storeReducer} from './reducers/store.reducer';
import {EffectsModule} from "@ngrx/effects";
import {LoadUserThreadsEffectService} from "./store/effects/load-user-threads.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(storeReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(LoadUserThreadsEffectService),
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
