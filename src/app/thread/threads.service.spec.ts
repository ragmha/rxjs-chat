import { Message } from '../message/message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

import { MessagesService } from './../message/messages.service';
import { ThreadsService } from './threads.service';

import * as _ from 'lodash';

describe('ThreadService', () => {
  it('should collect the Threads from Messages', () => {
    const raghib: User = new User('Raghib Hasan', '');
    const meow: User = new User('Meow Cat', '');

    const t1: Thread = new Thread('t1', 'Thread 1', '');
    const t2: Thread = new Thread('t2', 'Thread 2', '');

    const msg1: Message = new Message({
      author: raghib,
      text: 'Hello World!',
      thread: t1,
    });

    const msg2: Message = new Message({
      author: meow,
      text: 'Meowr!',
      thread: t1,
    });

    const msg3: Message = new Message({
      author: raghib,
      text: 'Hey pass the ketchup!',
      thread: t2,
    });

    // Creating instances of our Service :D
    const messagesService: MessagesService = new MessagesService();
    const threadsService: ThreadsService = new ThreadsService(messagesService);

    // Subscribe and Logggg

    threadsService.threads.subscribe((threadIdx: { [key: string]: Thread }) => {
      const threads: Thread[] = _.values(threadIdx);
      const threadNames: string = _.map(threads, (t: Thread) => t.name);

      console.log(`=> threads (${threads.length}): ${threadNames}`);
    });

    messagesService.addMessage(msg1);
    messagesService.addMessage(msg2);
    messagesService.addMessage(msg3);
  });
});
