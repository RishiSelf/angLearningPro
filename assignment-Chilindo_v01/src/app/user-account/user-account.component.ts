import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, NG_VALIDATORS, } from '@angular/forms';
// import { Ng2FileRequiredModule } from 'ng2-file-required';
import { countryPhoneCodeList } from './../countryPhoneCodeList';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css', './../assignment-two-landing/assignment-two-landing.component.css']
})
export class UserAccountComponent implements OnInit {
  //model: any;
  item: any;
  formData : any;
  formDataItems: any;
  countryPhoneCodeArr : any = [] ;

  createInvoiceForm : FormGroup;

  constructor( public frmBuilder: FormBuilder) {
    this.formData = {};
    this.formDataItems = [];
    let getCodeArrayList = new countryPhoneCodeList();
    this.countryPhoneCodeArr.push(getCodeArrayList.countryPhoneCodeArrItem);
  }

  getInvoiceDetails() {
    this.formDataItems.push(this.formData);
    this.formData = {}
    console.log(this.formData);
    console.log("FormDataItems", this.formDataItems);
  }

  ngOnInit() {
    this.item = 1;
  }

}
