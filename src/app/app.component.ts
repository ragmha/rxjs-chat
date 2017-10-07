import { Component, Inject } from '@angular/core';

import { ChatData } from './data/chat-data';

import { UsersService } from './user/users.service';
import { MessagesService } from './message/messages.service';
import { ThreadsService } from './thread/threads.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public messageService: MessagesService,
    public threadsService: ThreadsService,
    public usersService: UsersService
  ) {
    ChatData.init(messageService, threadsService, usersService);
  }
}
