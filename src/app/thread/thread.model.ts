const uuid = require('uuid/v4');
import { Message } from '../message/message.model';

/**
 * Thread represents a group of Users exchanging Messages
 *
 * + id
 * + name
 * + avatarSrc
 * + lastMessage (Stored as a reference :D)
 *
 */
export class Thread {
  id: string;
  name: string;
  avatarSrc: string;
  lastMessage: Message;

  constructor(id?: string, name?: string, avatarSrc?: string) {
    this.id = id || uuid();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
