import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../providers/rest-service/rest-service';
import { Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';


/*
  Generated class for the LogincomponentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  
  templateUrl: 'build/pages/loginpage/loginpage.html',
  inputs: ['Volunteer']
})
export class LoginPage {
loginForm: FormGroup;
regExPhone: string;
// loggedIn: boolean;
errorMessage: string;
error: boolean;
  
  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestService, private volSvc: Volunteerservice ) {
  this.navCtrl = navCtrl;
  this.regExPhone = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
  //this.volunteerHere = null;
  this.restSvc = restSvc;
      // this.loggedIn = false;
      

  this.loginForm = fb.group({  
            'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.pattern(this.regExPhone)])],
            'enterPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }


    onSubmit(value: any): void { 

        var that = this;
        try {
            that.restSvc.loginUser(value.enterPhoneNumber, value.enterPasscode)
                .subscribe( (data) => {
                    // that.properties = data;
                    // Expect response created here...
                    if (data.status == 200) {
                        console.log('successful call:' + data);
                        // this.restSvc.checkLoggedIn();
                        this.successForward(true,value.enterPhoneNumber);
                        return;
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + data);
                        this.error = true;
                        this.errorMessage = 'Unknown Error occurred attempting to login';
                        // 'We could not find your number in the system. Remember to enter only numbers (10 digits).'
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    that.error = true;
                    var subtitle;
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        // For the fake version.. we look it up in memory..     
                        var vol = 
                            that.volSvc.getVolunteerbyPhoneNumber(value.enterPhoneNumber);
                        if (vol) {
                            // Simulate a successful login
                            this.successForward(false,value.enterPhoneNumber);
                        } else {
                            // Simulate a bad login
                            that.errorMessage = "Authentication failed (enter a real fake user) :)";
                        }
                        // fake success
                    } else if (err.status == 400) {
                        that.errorMessage = err._body; // toString();
                    } else if (err.status == 401) {
                        // Actual error (most likely bad password)
                        if (err._body) {
                            var jsonobj = JSON.parse(err._body);
                            that.errorMessage = jsonobj.message;
                        } else {
                            that.errorMessage = err.toString();
                        }
                    } else {
                        that.errorMessage = err.toString() + ':' + err._body;
                    }
                }, () => {console.log('login complete');
                          //use timeout to call initIonic in order to reset
                          //CSRF TOKEN
                          if (!that.error) {
                              setTimeout(()=>{
                                  this.restSvc.initIonic(true,value.enterPhoneNumber);
                              },250);
                          }
                         });
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString());
            this.errorMessage = err.toString();
            this.error = true;
        }

        // xxxxxx

        /*
        this.volunteerHere = 
            this.volunteerservice.getVolunteerbyPhoneNumber(value.enterPhoneNumber);

        if (!this.volunteerHere){
            this.error = true;
            this.errorMessage = 'We could not find your number in the system. Remember to enter only numbers (10 digits).'
            return;
        };
        */

        /* if (this.volunteerHere.passcode==value.enterPasscode) */
        /* {
            this.loggedIn = true;
            this.restSvc.setLoggedIn(this.loggedIn);
            this.volunteerservice.setNewVolunteer(this.volunteerHere);
            try {
                
                this.navCtrl.push(AccountsettingsPage, {
                });
                
            } catch (EE) {
                console.log('error in Submitting, exc='+ EE.toString())
                console.log(EE.stack);
            } */
        /* } else {
            this.error = true;
            this.errorMessage = 'Incorrect password.'; 
        } */
    }

    successForward(real:boolean,phoneNumber) {
        var that = this;
        that.error = false;
        if (!real) {

            // fake version.. lookup data in rest-service now

            // console.log(error.stack());
            let alert = that.alertCtrl.create({
                title: 'TEST MODE: Simulating Logging In',
                subTitle: 'This simulates a login',
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        alert.dismiss();
                    }
                }]
            });
            //timeout the error to let other modals finish dismissing.
            setTimeout(()=>{
                this.restSvc.initIonic(true,phoneNumber);
                alert.present();
            },250);
        }
        // this.loggedIn = true;
        // this.restSvc.setLoggedIn(this.loggedIn);

        try {
            this.navCtrl.setRoot(RegistrationsuccessPage);
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            console.log(EE.stack);
        }
    }

    onResetPassword() {
        try {
            this.navCtrl.setRoot(ResetpasswordPage);
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            console.log(EE.stack);
        }
    }

}
