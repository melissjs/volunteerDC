import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';

/*
  Generated class for the LogincomponentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'logincomponent',
  templateUrl: 'build/pages/logincomponent/logincomponent.html',
  inputs: ['Volunteer']
})
export class Logincomponent {
loginForm: FormGroup;
regExPhone: string;
volunteerservice: Volunteerservice;
  
  
  constructor(private navCtrl: NavController, public fb: FormBuilder, volunteerservice: Volunteerservice) {
  this.navCtrl = navCtrl;
  this.volunteerservice = volunteerservice;
  this.regExPhone = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';

  this.loginForm = fb.group({  
            'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.regExPhone)])],
            'enterPasscode': ['', Validators.required]
        });
  }

  onSubmit(value: any): void { 
  }
  

}
