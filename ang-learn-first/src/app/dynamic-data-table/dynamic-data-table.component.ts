import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-data-table',
  templateUrl: './dynamic-data-table.component.html',
  styleUrls: ['./dynamic-data-table.component.css']
})
export class DynamicDataTableComponent implements OnInit {
  formData: any;
  datas: any;
  constructor() {
    this.formData = {};
    this.datas = [];
  }
  addData() {
    this.datas.push(this.formData);
    this.formData = {};
  }

  ngOnInit() {
  }
}
