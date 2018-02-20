import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css', './../create-account.component.css']
})
export class PersonalInfoComponent implements OnInit {
 item: number
  constructor() {
  }


  tabContent(item) {
    console.log(this);
  }
  containerIndx(item) {
    console.log(this);
  }

  ngOnInit() {
    console.log("testing 01");
    this.item = 1;
    console.log(this.item);


  }

}
