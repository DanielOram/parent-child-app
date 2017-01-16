import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {

  //observable variables
  private contentSource = new Subject<string>();
  private contentStream = this.contentSource.asObservable();

  private contentString: string;

  constructor() { }

  setMessage(message: string) {
    this.contentSource.next(message);
    this.contentString = message;
  }

}
