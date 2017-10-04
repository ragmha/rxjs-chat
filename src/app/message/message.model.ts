const uuid = require('uuid/v4');

import { User } from './../user/user.model';
import { Thread } from './../thread/thread.model';

/**
 *  Message represents One message being sent in a Thread
 *
 * + id
 * + sentAt
 * + isRead
 * + text
 * + author
 * + thread
 *
 */

export class Message {
  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || uuid();
    this.sentAt = (obj && obj.sentAt) || new Date();
    this.isRead = (obj && obj.isRead) || false;
    this.author = (obj && obj.author) || null;
    this.text = (obj && obj.text) || null;
    this.thread = (obj && obj.thread) || null;
  }
}
