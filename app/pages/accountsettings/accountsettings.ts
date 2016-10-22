import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
import { PollingStation} from '../../pollingstation';
//import {VotePage} from '../vote/vote';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import * as globals from '../../globals';

import { Logincomponent } from '../logincomponent/logincomponent';
import { UnregisteredsigninPage } from '../unregisteredsignin/unregisteredsignin';
import { Changepasswordcomponent } from '../changepasswordcomponent/changepasswordcomponent';

import {RestService} from '../../providers/rest-service/rest-service';

//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/accountsettings/accountsettings.html',
  //providers: [RestService],
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent, Logincomponent, Changepasswordcomponent],

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
    loggedIn: boolean;


    constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice, public fb: FormBuilder, private alertCtrl: AlertController, private restSvc: RestService) {
        this.navCtrl = navCtrl;
        this.volunteerservice = volunteerservice; 
        this.pollingstationservice = pollingstationservice;
        this.restSvc = restSvc;
        this.resetPasscode = false;
        this.loggedIn = false;

        if(this.restSvc.getLoggedIn()){
            this.loggedIn = true;
        }

        this.currentTempVolunteer = this.volunteerservice.getNewVolunteer();



        /*this.loggedIn = this.restSvc.getLoggedIn();
        if (this.loggedIn==false){
        console.log('false ' + this.loggedIn)
        this.currentTempVolunteer = this.volunteerservice.setToVoidVolunteer();
        } else if(this.loggedIn==true){
            this.currentTempVolunteer = volunteerservice.getNewVolunteer();
            console.log(this.currentTempVolunteer);
        }*/


 //for Testing only
/*
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
            passcode: 'passcodestring',
            associatedPollingStationKey:'ps1', 
            totalRecords: 0,
            totalVoteRecords: 0,
            totalAnomalyRecords: 0,
            totalAmendmentRecords: 0,
        } 
*/



        // if no volunteer, begin instance thats blank


//ATTEMP TO FIX PROBLEM
/*
if (!this.currentTempVolunteer || this.currentTempVolunteer.fullName==null){

        this.currentTempVolunteer = {
            volunteerKey: null,
            fullName: null,
            emailAddress: null,
            exposeEmail: false,
            phoneNumber: null,
            age:null,
            sex: null,
            partyAffiliation: null,
            shifts:'', 
            passcode: null,
            associatedPollingStationKey:null, 
            totalRecords:null,
            totalVoteRecords:null,
            totalAnomalyRecords: null,
            totalAmendmentRecords: null,
        }
        volunteerservice.setNewVolunteer(this.currentTempVolunteer);

}*/

        //set vol to void if needed
       /*if (!this.currentTempVolunteer || this.currentTempVolunteer.fullName==null){
            this.currentTempVolunteer = this.volunteerservice.setToVoidVolunteer();
        }*/




        //form stuff
        var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
        var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
        var regExAge: string = '[1]*[0-9]?[0-9]';

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
            'passcodeCtrl': [this.currentTempVolunteer.passcode, Validators.required],

        });

        

        

 


        //get shift printout
        /*if(volunteerservice.currentVolunteer.associatedPollingStationKey!==null){
        this.printedShifts = this.volunteerservice.printShifts(this.currentTempVolunteer);
        }*/

       if(this.currentTempVolunteer.associatedPollingStationKey!==null){
        this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentTempVolunteer.associatedPollingStationKey)
        this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
       }

        //get associate volunteer keys
        if(this.currentTempVolunteer.associatedPollingStationKey!==null){
        
      //TODO########  this.fullVolunteerList = 
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
this.resetPasscode = true;
}


onLogout(){
    this.loggedIn = false;
    this.currentTempVolunteer = this.volunteerservice.setToVoidVolunteer();
}

// CHANGE EXPOSE EMAIL
    onChangeExposeEmail(passedValue){
        this.currentTempVolunteer.exposeEmail = passedValue;
    }





// CHANGE SEX
    onChangeSex(passedValue){
        this.currentTempVolunteer.sex = passedValue;
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
                        console.log('Disagree clicked' + this.currentTempVolunteer.shifts);
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        
                        //this.volunteerservice.clearShifts()
                        this.currentTempVolunteer.shifts = '';
                        this.printedShifts = "None";
                        console.log('Agree clicked' + this.currentTempVolunteer.shifts);
                        
                    }
                }
            ]
        });
        confirm.present();
    }


 





// CHANGE PARTY AFFILIATION
onChangePartyAffiliationFromList(passedValue){
    this.currentTempVolunteer.partyAffiliation = passedValue;

}


    wasThisTouched(){
        this.wasTouched = true;
        
    }

// CLICK FOR STATION
    goToStationDetails(){
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

        if(this.changeForm.valid) {
            //console.log('Submitted value: ', value);
            this.currentTempVolunteer.fullName = value.fullNameCtrl;
            this.currentTempVolunteer.emailAddress = value.emailAddressCtrl;
            this.currentTempVolunteer.phoneNumber = value.phoneNumberCtrl;
            this.currentTempVolunteer.age = value.ageCtrl;
            //this.currentTempVolunteer.sex = value.sexCtrl;
            //this.currentTempVolunteer.partyAffiliation = value.partyAffiliationCtrl;
            this.currentTempVolunteer.passcode = value.passcodeCtrl;
            this.wasTouched = false;
            if(this.currentTempVolunteer.shifts == ""){ this.currentTempVolunteer.associatedPollingStationKey = null;}
            this.volunteerservice.overWriteChangesToVolunteer(this.currentTempVolunteer);
            
            this.volunteerservice.printVolunteer(this.currentTempVolunteer);
             //this.volunteerservice.printVolunteer(this.volunteerservice.currentVolunteer);
            //console.log('temp ' + this.currentTempVolunteer.shifts);
           // console.log('vservice ' + this.volunteerservice.currentVolunteer.shifts);
        }



    }

// END CLASS
}
