import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {

  //observable variables
  private messageSource = new Subject<string>();
  messageStream = this.messageSource.asObservable();

  private responseSource = new Subject<number>();
  responseStream = this.responseSource.asObservable();

  private resetSource = new Subject<boolean>();
  resetStream = this.resetSource.asObservable();

  constructor() { }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }

  sendResponse(confirmedComponent: number){
    this.responseSource.next(confirmedComponent);
  }

  resetMessages(){
    //this.messageSource.next("All messages Confirmed");
    this.resetSource.next(true);
  }

}
