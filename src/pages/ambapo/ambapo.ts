import { Component, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const ambapoURL: string = 'http://cirdlesserver.cs.cofc.edu/Services/ambapo';

@Component({
  selector: 'app-ambapo',
  templateUrl: './ambapo.html',
  styleUrls: ['./ambapo.scss']
})

export class Ambapo {
  zone: NgZone;

  constructor() {

    var _this = this;

    // this will be used to properly cause screen updates
    this.zone = new NgZone({enableLongStackTrace: false});

      // need to use NgZone to update the screen properly
      _this.zone.run(() => {
      });
    }

}
