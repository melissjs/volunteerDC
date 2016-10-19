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

//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/accountsettings/accountsettings.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent],

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


    constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice, public fb: FormBuilder, private alertCtrl: AlertController) {
        this.navCtrl = navCtrl;
        this.volunteerservice = volunteerservice; 
        this.pollingstationservice = pollingstationservice;
        if(volunteerservice.currentVolunteer!==null){
            this.currentTempVolunteer = volunteerservice.getNewVolunteer();
            console.log(this.currentTempVolunteer);
        }


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

}


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
            'partyAffiliationCtrl': [this.currentTempVolunteer.partyAffiliation],
            'shiftsCtrl': [this.currentTempVolunteer.shifts],
            'passcodeCtrl': [this.currentTempVolunteer.passcode, Validators.required],

        });

        

        
        //setVolunteer 
        volunteerservice.setNewVolunteer(this.currentTempVolunteer);
        

 

        // get exposed value
        
           // this.exposedYesOrNo = this.volunteerservice.isEmailExposed(this.currentTempVolunteer);
        


        //get shift printout
         
        this.printedShifts = this.volunteerservice.printShifts(this.currentTempVolunteer);
         

       if(volunteerservice.currentVolunteer.associatedPollingStationKey!==null){
        this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentTempVolunteer.associatedPollingStationKey)
        this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
       }

        //get associate volunteer keys
        if(volunteerservice.currentVolunteer.associatedPollingStationKey!==null){
        this.fullVolunteerKeyList = this.pollingstationservice.getAssociatedVolunteerKeyList(this.currentTempVolunteer.associatedPollingStationKey);
        //make array of associated volunteerservices
        this.fullVolunteerList = this.volunteerservice.getVolunteerArrayByKeyList(this.fullVolunteerKeyList);
        }







        //end constructor
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
