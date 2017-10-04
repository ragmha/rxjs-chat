import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';

import { User } from '../user/user.model';
import { Message } from './message.model';
import { Thread } from '../thread/thread.model';

/**
 * MessageService publishes new messages only once
 *
 *  This service contains 5 streams [ 3 "Data Management Streams", 2 "Action Streams"]
 *
 *  Data management Stream
 *  ========================
 *  1. newMessages - Emits each new Message once
 *  2. messages - Emits an Array of current Messages
 *  3. updates - Performs operations on messages
 *  =============================================
 *
 *  scan (similar to reduce) - accumulates values of incoming stream, it will emit a value
 *  for each intermediate result
 *
 *  publishReplay - Helps us share a subscription between multiple subscribers and replay n number
 *  of values to future subscribes
 *
 *  refCount - Makes it easier to return value of publish, by managing when the observable will emit
 *  values
 */

const initialMessages: Message[] = [];
type IMessagesOperation = (messages: Message[]) => Message[];

@Injectable()
export class MessagesService {
  // A stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // A stream that emits an array of current up-to date messages
  messages: Observable<Message[]>;

  // A stream that recieves operations to be applied to messages
  // Performs changes on "all" messages (that are currently stored
  // in `messages`)
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates
      // watch the updates and accumulate operations on the messages
      .scan(
        (messages: Message[], operation: IMessagesOperation) =>
          operation(messages),
        initialMessages
      ) // Helps in sharing the most recent list of messages across subscriber
      // intereseted in subscribring and caching the last known list of messages
      .publishReplay(1)
      .refCount();

    // This stream will emit a function which accepts the list of Messages
    // and adds this Message to our list of messages
    this.create
      .map((message: Message): IMessagesOperation => (messages: Message[]) =>
        messages.concat(message)
      )
      .subscribe(this.updates);
    /* update stream listens to create stream, if create stream recieves a Message
      it will emit an IMessagesOperation that will be recieved by updates and then
      the Message will be added to messages */

    // This connects the flow between newMessages and create stream
    this.newMessages.subscribe(this.create);

    // Takes a thread and puts an operation on updates stream to mark Messages as read
    this.markThreadAsRead
      .map((thread: Thread) => (messages: Message[]) =>
        messages.map((message: Message) => {
          if (message.thread.id === thread.id) {
            message.isRead = true;
          }
          return message;
        })
      )
      .subscribe(this.updates);
  }

  // Imperative func to call action stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  // Stream of "Everyone else's message in the Thread"
  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.filter(
      (message: Message) =>
        // Belongs to this thread & isn't authored by this user
        message.thread.id === thread.id && message.author.id !== user.id
    );
  }
}

export const messageServiceInjectables: Array<any> = [MessagesService];
