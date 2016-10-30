import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
import { PollingStation} from '../../pollingstation';
//import {VotePage} from '../vote/vote';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';
import { ResetpasswordPage } from '../resetpassword/resetpassword'

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import * as globals from '../../globals';

//import { Logincomponent } from '../logincomponent/logincomponent';
import { UnregisteredsigninPage } from '../unregisteredsignin/unregisteredsignin';
import { Changepasswordcomponent } from '../changepasswordcomponent/changepasswordcomponent';

import {RestService} from '../../providers/rest-service/rest-service';

//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/accountsettings/accountsettings.html',
  //providers: [RestService],
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent /*, Logincomponent */, Changepasswordcomponent],

})
export class AccountsettingsPage {
    changeForm: FormGroup;
    currentVolunteer: Volunteer; 
    exposedYesOrNo: string;
    volunteerservice: Volunteerservice;
    pollingstationservice: Pollingstationservice;
    currentTempVolunteer: Volunteer;
    thisTempStation: PollingStation;
    thisTempStationPrecint: string;
    printedShifts: string;
    fullVolunteerKeyList: string[];
    fullVolunteerList: Volunteer[];
    wasTouched: boolean;
    resetPasscode: boolean;
    // loggedIn: boolean;
    passChange: boolean;



    constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice, public fb: FormBuilder, private alertCtrl: AlertController, private restSvc: RestService) {
        this.navCtrl = navCtrl;
        this.volunteerservice = volunteerservice; 
        this.pollingstationservice = pollingstationservice;
        this.restSvc = restSvc;
        this.resetPasscode = false;
        // this.loggedIn = false;
        this.passChange = false;
        this.volunteerservice.associatedVolunteerArray = [];


        this.restSvc.getLoggedIn();
        // this.loggedIn = false;

        this.currentTempVolunteer = this.volunteerservice.getNewVolunteer();

 //for Testing only

        /*
        if (this.currentTempVolunteer == null) {

            this.loggedIn = true;

            this.currentTempVolunteer = {
                volunteerKey: 'v5',
                fullName: 'Raya Hammond',
                emailAddress: 'email@email.com',
                exposeEmail: true,
                phoneNumber: '6024539544',
                age: 23,
                sex: 'Female',
                partyAffiliation: "Other Party",
                shifts:'Late Morning, Early Evening, Early Morning, Late Evening', //'Late Morning, Early Evening'
                associatedPollingStationKey:'ps1'
            } 
        }
        */

        //form stuff
        var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
        var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
        var regExAge: string = '[1]*[0-9]?[0-9]';

        if (this.currentTempVolunteer) {
            this.changeForm = fb.group({  
                'fullNameCtrl': [this.currentTempVolunteer.fullName, Validators.compose([Validators.required])],
                'emailAddressCtrl': [this.currentTempVolunteer.emailAddress, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExEmail)])],
                'exposeEmailCtrl': [this.currentTempVolunteer.exposeEmail],
                'phoneNumberCtrl': [this.currentTempVolunteer.phoneNumber, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExPhone)])],
                'ageCtrl': [this.currentTempVolunteer.age, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(regExAge)])],
                'sexCtrl': [this.currentTempVolunteer.sex],
                'partyAffiliationCtrl': [this.currentTempVolunteer.partyAffiliation, Validators.required],
                // 'otherPartyAffiliationCtrl': [this.currentTempVolunteer.partyAffiliation],
                'shiftsCtrl': [this.currentTempVolunteer.shifts],
                'passcodeCtrl': [Validators.required],
            });

            if(this.currentTempVolunteer.associatedPollingStationKey!==null){
                this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentTempVolunteer.associatedPollingStationKey)
                this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
            }

            //get associate volunteer keys
            if(this.currentTempVolunteer.associatedPollingStationKey!==null){
                this.fullVolunteerList = this.volunteerservice.getTeamVolunteersByPollKey(this.currentTempVolunteer.associatedPollingStationKey)
            }
        }

        //end constructor
    }

onClickRegister(){
        var that = this;
        try {
            
            this.navCtrl.push(UnregisteredsigninPage, {
            });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            
        }
}

onClickReset(){
//this.resetPasscode = true;
        try {
            
            this.navCtrl.push(ResetpasswordPage, {
            });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            
        }
}

    onLogout() {
        this.restSvc.onLogout(this,this.displayError);
    }

// CHANGE EXPOSE EMAIL
    onChangeExposeEmail(passedValue){
        this.wasThisTouched();
        if (this.currentTempVolunteer) {
            this.currentTempVolunteer.exposeEmail = passedValue;
        }
    }






// CHANGE SEX
    onChangeSex(passedValue){
        if (this.currentTempVolunteer) {
            this.currentTempVolunteer.sex = passedValue;
        }
    }


// CHANGE SHIFTS

/*onChangeShifts(shift){
    this.currentTempVolunteer.shifts = shift;
}*/
  
  
    askShifts(){
        let confirm = this.alertCtrl.create({
            title: 'Would you like to cancel your shifts?',
            message: 'If you want to change times or stations, head over to the polling station pages.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        if (this.currentTempVolunteer) {
                            console.log('Disagree clicked' + this.currentTempVolunteer.shifts);
                        } else {
                            console.log('how did we get here?? account settings no volunteer!');
                        }
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        
                        //this.volunteerservice.clearShifts()
                        if (this.currentTempVolunteer) {
                            this.currentTempVolunteer.shifts = '';
                            this.printedShifts = "None";
                            this.currentTempVolunteer.associatedPollingStationKey = null;
                            this.volunteerservice.associatedVolunteerArray = [];
                            console.log('Agree clicked' + this.currentTempVolunteer.shifts);
                        }
                        console.log('how did we get here either?? account settings no volunteer!');                       
                    }
                }
            ]
        });
        confirm.present();
    }


 
// CHANGE PWD



onConfirmOldPasscode(){
    //var errorForThis: string;
    var that = this;
    //let 
    let prompt = this.alertCtrl.create({
      title: 'Verification Required  ',
      message: "Enter your old passcode to verify this change. ",
      inputs: [
        {
          name: 'old',
         placeholder: 'Old Password',
         type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enter',
          handler: data => {
              if (this.restSvc.matchesPasscode(data.old)){
                  this.passChange = true;
                  this.resetPasscode = true;
                  console.log('from inside ' + this.passChange)
                 } else {
                   that.showAlertForOld();
                 }
          }
        }
      ]
    });
    prompt.present();
    
  }



showAlertForOld() {
let alert = this.alertCtrl.create({
 title: 'Incorrect Password',
 subTitle: 'You must enter your correct password in order to change it. If you have forgotten it, you may reset.',
 buttons: ['OK']
 });
            setTimeout(()=>{
            alert.present();
             },500);
 //alert.present();
  }




// CHANGE PARTY AFFILIATION
onChangePartyAffiliationFromList(passedValue){
    if (this.currentTempVolunteer) {
        this.currentTempVolunteer.partyAffiliation = passedValue;
    }
}


    wasThisTouched(){
        this.wasTouched = true;
        
    }

// CLICK FOR STATION
    goToStationDetails() {
        console.log('thisTempStation'+ this.thisTempStation);
        this.pollingstationservice.setStation(this.thisTempStation);
        var that = this;
        try {
            
            this.navCtrl.push(PollingstationdetailsPage, {
            });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            
        }
    }

    onSubmit(value: any): void {

        if ((this.changeForm.valid) && (this.currentTempVolunteer)) {
            //console.log('Submitted value: ', value);
            this.currentTempVolunteer.fullName = value.fullNameCtrl;
            this.currentTempVolunteer.emailAddress = value.emailAddressCtrl;
            this.currentTempVolunteer.phoneNumber = value.phoneNumberCtrl;
            this.currentTempVolunteer.age = value.ageCtrl;
            //this.currentTempVolunteer.sex = value.sexCtrl;
            //this.currentTempVolunteer.partyAffiliation = value.partyAffiliationCtrl;
            //this.currentTempVolunteer.passcode = value.passcodeCtrl;
            this.wasTouched = false;
            if(this.currentTempVolunteer.shifts == ""){ this.currentTempVolunteer.associatedPollingStationKey = null;}

            var that = this;
            this.restSvc.saveVolunteerInfo()
                .subscribe( (data) => {
                    // Expect response created here...
                    if (data.status == 200)  {
                        console.log('successful call to save:' + data);
                        this.successForward(true);
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + data);
                        this.successForward(true);              
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    var errStr = null;
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        this.successForward(false);
                    } else if (err.status == 400) {
                        errStr = err._body // toString();
                    } else {
                        errStr = err.toString();
                    }
                    // console.log(error.stack());
                    let alert = that.alertCtrl.create({
                        title: 'Error Saving Account Settings',
                        subTitle: errStr,
                        buttons: [{
                            text: 'OK',
                            handler: () => {
                                alert.dismiss();
                            }
                        }]
                    }
                                                     );
                    //timeout the error to let other modals finish dismissing.
                    setTimeout(()=>{
                        alert.present();
                    },250);
                }, () => {console.log('save polling details complete')}
                          );
        }
    }

    successForward(real:boolean) {


        if (!real) {
            if (this.currentTempVolunteer) {
                this.volunteerservice.overWriteChangesToVolunteer(this.currentTempVolunteer);
            }
        }

        if (this.currentTempVolunteer) {
            this.volunteerservice.printVolunteer(this.currentTempVolunteer);
        }
        console.log(this.passChange + ' after submit ');

    }

    displayError(that:any,text: string,subtitle: string) {
        let alert = that.alertCtrl.create({
            title: text,
            subTitle: subtitle,
            buttons: [{
                text: 'OK',
                handler: () => {
                    alert.dismiss();
                }
            }]
        });
        //timeout the error to let other modals finish dismissing.
        setTimeout(()=>{
            alert.present();
        },250);
    }

// END CLASS
}
