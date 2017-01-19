import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {

  //observable variables
  private messageSource = new Subject<string>();
  messageStream = this.messageSource.asObservable();

  private confirmedSource = new Subject<number>();
  confirmedStream = this.confirmedSource.asObservable();

  private resetSource = new Subject<boolean>();
  resetStream = this.resetSource.asObservable();

  constructor() { }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }

  confirmMessage(confirmedComponent: number){
    this.confirmedSource.next(confirmedComponent);
  }

  allMessagesConfirmed(){
    //this.messageSource.next("All messages Confirmed");
    this.resetSource.next(true);
  }

}
