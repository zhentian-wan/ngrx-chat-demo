import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from "@angular/router";
import {RouterStoreModule} from "@ngrx/router-store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {UserSelectionModule} from "./user-selection/user-selection.module";
import {ThreadSectionModule} from "./thread-section/thread-section.module";
import {MessageSectionModule} from "./message-section/message-section.module";
import {ThreadsService} from "./services/threads.service";

import {rootReducers} from './reducers/index';
import {
  LoadUserThreadsEffectService,
  SaveNewMessageEffectService,
  RefreshMessageListEffectService,
  MarkUnreadMessageReadEffectService
} from './store/index';

import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import {routes} from "./app.routes";


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
