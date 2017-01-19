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
  //@Input() childButtonActive: boolean;

  childButtonActive: boolean = false;

  responseSent: boolean = false;
  subscription: Subscription;
  resetSubcription: Subscription;

  constructor(private appService: AppService) {
    this.subscription = appService.messageStream.subscribe(
      message => {
        this.childMessage = message;  
        this.childButtonActive = true;   
      }
    );

    this.resetSubcription = appService.resetStream.subscribe(
      bool => {
        this.childButtonActive = bool;
        this.responseSent = !bool;
      }
    )
  }

  confirmMessageReceived(){
    this.appService.sendResponse(this.childNumber);
    this.responseSent = true;
    this.childButtonActive = false;
    this.childMessage = "Awaiting message from parent";
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
  this.resetSubcription.unsubscribe();
}

}
