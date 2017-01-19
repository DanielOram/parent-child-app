import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '../app.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  @Input() navbarContentString: string;  

  subscription: Subscription;

  constructor(private appService: AppService) {
    this.subscription = appService.messageStream.subscribe(
      content => {
        console.log("navbar subscription updated with: " + content);
      }
    );
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
