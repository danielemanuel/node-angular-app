import { Component } from '@angular/core';

import { Message } from './messages/message.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})

export class AppComponent {
    message: Message = new Message('Some message in the app model', 'Daniel');
}
