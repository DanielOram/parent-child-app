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

  responseSent: boolean = false;
  subscription: Subscription;

  constructor(private appService: AppService) {
    this.subscription = appService.messageStream.subscribe(
      message => {
        this.childMessage = message;     
      }
    );
  }

  confirmMessageReceived(){
    this.appService.sendResponse(this.childNumber);
    this.responseSent = true;
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
