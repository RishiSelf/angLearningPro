import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approver-account',
  templateUrl: './approver-account.component.html',
  styleUrls: ['./approver-account.component.css', './../assignment-two-landing/assignment-two-landing.component.css']
})
export class ApproverAccountComponent implements OnInit {
  item: any;
  constructor() { }

  ngOnInit() {
    this.item = 1;
  }

}
