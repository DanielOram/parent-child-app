import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  parentMessage: string = "Awaiting button press";
  childrenConfirmed: string[] = [];
  childrenTotal: number[] = [1,2,3];
  enableReset: boolean = false;

  constructor(private appService: AppService){
    appService.confirmedStream.subscribe(
      componentNumber => {

        var index = this.childrenTotal.indexOf(componentNumber, 0);
        if (index > -1) {
          this.childrenConfirmed.push("message confirmed from child component #" + String(componentNumber));
          this.childrenTotal.splice(index, 1);
        }

        if (this.childrenTotal.length == 0) {
          this.appService.allMessagesConfirmed();
          this.enableReset = true;
          this.childrenTotal = [1,2,3];
        }
      });
  }

  sendMessage(){
    this.appService.sendMessage("message recieved from parent");
  }

  reset(){
    
  }

}
