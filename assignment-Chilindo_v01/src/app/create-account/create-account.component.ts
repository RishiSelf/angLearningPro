import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, NG_VALIDATORS, } from '@angular/forms';
import { countryPhoneCodeList } from './../countryPhoneCodeList';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  model: any;
  item: any;
  formData : any;
  formDataItems: any;
  //fileName: any;
  countryPhoneCodeArr : any = [] ;

  fileNameLength = 0;

  createAccountForm : FormGroup;
  constructor(public FormBuilder: FormBuilder) {
      this.formData = {};
      this.formDataItems = [];
      let getCodeArrayList = new countryPhoneCodeList();
      this.countryPhoneCodeArr.push(getCodeArrayList.countryPhoneCodeArrItem);
  }

  onInputFileUploadChange(event) {
      if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        //validation here then attribute the value to your model
        this.model = file
        // if(file = null) {
        //   alert("Empty");
        // }else {
        //   alert("Filled");
        // }
        console.log(this.model);
      }
    }

    tabContent(item) {
    }
    containerIndx(item) {
      console.log(this.formData);
    }
    getFormValue(item) {
      this.formDataItems.push(this.formData);
      this.formData = {}
      console.log(this.formData);
      console.log("FormDataItems", this.formDataItems);
    }
    ngOnInit() {
      this.item = 1;
    }

}
