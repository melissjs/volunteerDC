import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
/*
  Generated class for the ChangepasswordcomponentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'changepasswordcomponent',
  templateUrl: 'build/pages/changepasswordcomponent/changepasswordcomponent.html',
  inputs: ['Volunteer']
})
export class Changepasswordcomponent {
changePasswordForm: FormGroup;
regExPassword: string;
volunteerservice: Volunteerservice;

  constructor(private navCtrl: NavController, public fb: FormBuilder, volunteerservice: Volunteerservice) {
 this.navCtrl = navCtrl;
  this.volunteerservice = volunteerservice;
  //this.regExPassword = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
  //Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.regExPhone)

  this.changePasswordForm = fb.group({  
            'enterCreatePasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'enterConfirmPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }

  onSubmit(value: any): void { 
  }
  

}
