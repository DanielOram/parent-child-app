import { Component, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../app.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnDestroy {

  @Input() childMessage: string;
  @Input() childNumber: number;
  @Input() allMessagesConfirmed: boolean;

  messageReceived: boolean = false;
  

  subscription: Subscription;

  constructor(private appService: AppService) {
    this.subscription = appService.messageStream.subscribe(
      message => {
        this.childMessage = message;
        if(!this.allMessagesConfirmed){
          this.messageReceived = true;
        }     
      }
    );
  }

  confirmMessageReceived(){
    this.appService.confirmMessage(this.childNumber);
    this.messageReceived = false;
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
