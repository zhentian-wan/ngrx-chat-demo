import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule, combineReducers} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from "ngrx-store-freeze";

import {AppComponent} from './app.component';
import {UserSelectionModule} from "./user-selection/user-selection.module";
import {ThreadSectionModule} from "./thread-section/thread-section.module";
import {MessageSectionModule} from "./message-section/message-section.module";
import {ThreadsService} from "./services/threads.service";

import {rootReducers} from './reducers/index';
import {EffectsModule} from "@ngrx/effects";
import {LoadUserThreadsEffectService} from "./store/effects/load-user-threads.service";
import {SaveNewMessageEffectService} from "./store/effects/save-new-message.service";
import {RefreshMessageListEffectService} from "./store/effects/refresh-message-list.service";
import {MarkUnreadMessageReadEffectService} from "./store/effects/mark-unread-message-read.service";
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {RouterStoreModule} from "@ngrx/router-store";

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessagesComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducers),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(LoadUserThreadsEffectService),
    EffectsModule.run(SaveNewMessageEffectService),
    EffectsModule.run(RefreshMessageListEffectService),
    EffectsModule.run(MarkUnreadMessageReadEffectService),
    UserSelectionModule,
    ThreadSectionModule,
    MessageSectionModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
    ThreadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
