import { MessagesService } from './messages.service';

import { Message } from './message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

describe('MessagesService', () => {
  it('should test', () => {
    const user: User = new User('Raghib', '');
    const thread: Thread = new Thread('t1', 'Nate', '');
    const msg1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: Thread,
    });
    const msg2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: Thread,
    });

    const messagesService: MessagesService = new MessagesService();

    // Listen to each message as indvidual
    messagesService.newMessages.subscribe((message: Message) =>
      console.log('=> newMessages: ' + message.text)
    );

    // listen to current message
    messagesService.messages.subscribe((messages: Message[]) =>
      console.log('=> messages: ' + messages.length)
    );

    messagesService.addMessage(msg1);
    messagesService.addMessage(msg2);
  });
});
