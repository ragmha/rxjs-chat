import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Thread } from '../thread/thread.model';
import { ThreadsService } from '../thread/threads.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css'],
})
export class ChatThreadsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
