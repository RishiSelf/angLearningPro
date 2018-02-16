import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
 toggleEvent:  boolean= true;

 changeEvent(e) {
   if(e.target.checked) {
     this.toggleEvent = false;
   }
   else {
     this.toggleEvent = true;
   }
 }
  constructor() {}
  ngOnInit() {
  }

}
