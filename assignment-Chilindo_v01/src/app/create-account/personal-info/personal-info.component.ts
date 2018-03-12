import { Component, OnInit } from '@angular/core';
// import { Ng2FileRequiredModule } from 'ng2-file-required';
import { FormBuilder, FormGroup, Validators, NG_VALIDATORS, } from '@angular/forms';
import { countryPhoneCodeList } from './../../countryPhoneCodeList';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css', './../create-account.component.css']
})
export class PersonalInfoComponent implements OnInit {
  model: any;
  item: any;
  formData : any;
  formDataItems: any;
  countryPhoneCodeArr : any = [] ;

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
      console.log(this.formData);
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
