import { Component } from "@angular/core";

@Component({
  selector: 'app-message', //<app-message>
  templateUrl: './message.component.html',
  styles: [`
      .author {
          display: inline-block;
          font-style: itlaic;
          font-size: 12px;
          width: 80%;
      }
      .config {
          display: inline-block;
          text-align: right;
          font-size: 12px;
          width: 19%;
      }
  `]
})

export class MessageComponent {

}
