import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';

import { Thread } from './thread.model';
import { Message } from '../message/message.model';

import { MessagesService } from '../message/messages.service';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages.map((messages: Message[]) => {
      const threads: { [key: string]: Thread } = {};
      // Store the message's thread in our accumulator `threads`
      messages.map((message: Message) => {
        threads[message.thread.id] =
          threads[message.thread.id] || message.thread;

        // Cache the most recent message for each thread
        const messageThread: Thread = threads[message.thread.id];

        if (
          !messageThread.lastMessage ||
          messageThread.lastMessage.sentAt < message.sentAt
        ) {
          messageThread.lastMessage = message;
        }
      });

      return threads;
    });
  }
}
