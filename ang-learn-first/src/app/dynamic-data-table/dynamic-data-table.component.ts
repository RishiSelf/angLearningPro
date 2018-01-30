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
    // this.datas = [{
    //   // fName: '',
    //   // lName: '',
    //   // age: '',
    //   // expr: '',
    // }];
    this.datas = [];
  }
  addData() {
    console.log(this.formData);
    console.log(this.datas);
    //this.datas.push(this.formData);
    //this.formData = {};
   // const fitlerData = this.datas.trim();
    //console.log(fitlerData);
    if ((this.datas = []) === null) {
        console.log('No Data');
      }else {
        console.log('Yes Data');
      }
  }

  ngOnInit() {
    // if (this.formData == null) {
    //   console.log('No Data');
    // }else {
    //   console.log('Yes Data');
    // }
  }
}
