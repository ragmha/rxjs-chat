const uuid = require('uuid/v4');

/**
 *  A User represents an aggent that sends messages
 *
 *  + id
 *  + name
 *  + avatarSrc
 *
 */

export class User {
  id: string;

  constructor(public name: string, public avatarSrc: string) {
    this.id = uuid();
  }
}
