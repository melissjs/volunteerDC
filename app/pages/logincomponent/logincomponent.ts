import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import { AccountsettingsPage } from '../accountsettings/accountsettings';



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
volunteerHere: Volunteer;
loggedIn: boolean;
errorMessage: string;
error: boolean;
  
  constructor(private navCtrl: NavController, public fb: FormBuilder, volunteerservice: Volunteerservice, private restSvc: RestService ) {
  this.navCtrl = navCtrl;
  this.volunteerservice = volunteerservice;
  this.regExPhone = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
  //this.volunteerHere = null;
  this.restSvc = restSvc;
  this.loggedIn = false;
      

  this.loginForm = fb.group({  
            'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.regExPhone)])],
            'enterPasscode': ['', Validators.required]
        });
  }


  onSubmit(value: any): void { 


    this.volunteerHere = this.volunteerservice.getVolunteerbyPhoneNumber(value.enterPhoneNumber);

    if (!this.volunteerHere){
      this.error = true;
    this.errorMessage = 'We could not find your number in the system. Remember to enter only numbers (10 digits).'
    return;
    };

    if (this.volunteerHere.passcode==value.enterPasscode){
      this.loggedIn = true;
      this.restSvc.setLoggedIn(this.loggedIn);
      this.volunteerservice.setNewVolunteer(this.volunteerHere);
               try {
            
                this.navCtrl.push(AccountsettingsPage, {
                  });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
    } else {
      this.error = true;
      this.errorMessage = 'Incorrect password.';
    }






  }
  

}
