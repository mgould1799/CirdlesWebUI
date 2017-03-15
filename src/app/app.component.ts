import { Component } from '@angular/core';
import { Location, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public paths: Array<any> = [];
  public currentPage: string = "";

  constructor(public location: Location) {

    this.paths = [
      {name: 'Home', path: '/home'},
      {name: 'Calamari', path: '/prawn'}
    ]

    this.setCurrentUrlName();

  }

  public pageChanged(name: string) {
    this.currentPage = name;
  }

  private setCurrentUrlName() {
    let name = "";
    let url = this.location.path;
    let found = false;

    let i = 0;
    while (!found && i < this.paths.length) {
      if (this.location.isCurrentPathEqualTo(this.paths[i].path)) {
        name = this.paths[i].name;
        found = true;
      }
      i++;
    }

    if (!found)
      this.currentPage = "Home";
    else
      this.currentPage = name;
  }

}
