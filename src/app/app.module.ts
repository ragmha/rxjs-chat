import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UsersService } from './user/users.service';
import { MessagesService } from './message/messages.service';
import { ThreadsService } from './thread/threads.service';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatWindowComponent,
    ChatThreadsComponent,
  ],
  imports: [BrowserModule],
  providers: [UsersService, MessagesService, ThreadsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
