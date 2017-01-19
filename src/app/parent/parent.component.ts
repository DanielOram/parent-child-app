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
  children: number[] = [1,2,3];
  allResponsesReceivedFromChildren: boolean = false;

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
          this.allResponsesReceivedFromChildren = true;
          console.log(this.allResponsesReceivedFromChildren);
      }
    }

  sendMessage(){
    this.appService.sendMessage("message recieved from parent");
  }

  reset(){
    
  }

}
