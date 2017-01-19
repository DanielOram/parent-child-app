import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  parentMessage: string = "Awaiting message from parent";
  childrenConfirmed: string[] = [];
  children: number[] = [1,2,3];
  resetChildButtons: boolean = false;

  constructor(private appService: AppService){
    appService.responseStream.subscribe(
      componentNumber => {
        var index = this.children.indexOf(componentNumber, 0);
        if(index > -1) {
          this.childrenConfirmed.push("message confirmed from child component #" + componentNumber);
          this.children.splice(index, 1);
        }
        this.checkAllResponsesReceived();
      }
    );
  }


  checkAllResponsesReceived(){
      if (this.children.length == 0) {
          this.children = [1,2,3];
      }
    }

  sendMessage(){
    this.appService.sendMessage("message recieved from parent");
    this.childrenConfirmed = [];
    this.appService.resetMessages();
  }

  reset(){
    
  }

}
