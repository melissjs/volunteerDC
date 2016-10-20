import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

import { Volunteer} from '../../volunteer';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice'
//import { VOLUNTEERS} from '../../volunteerlist.ts';

import * as globals from '../../globals';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
})
export class UnregisteredsigninPage {
newVolunteer: Volunteer;
volunteerKey: string;
enterFullName: string;
enterEmailAddress: string;
enterExposeEmail: boolean;
enterPhoneNumber: string;
enterAge: number;
enterSex: string;
enterPartyAffiliation: string;
enterShifts: string;
enterPasscode: string;
enterPasscode1: string;
enterPasscode2: string;
enterTotalRecords: number;
enterTotalVoteRecords: number;
enterTotalAnomalyRecords: number;
enterTotalAmendmentRecords: number;
enterPartyAffiliationFromList: string;
enterOtherPartyAffiliation: string;
volunteerservice: Volunteerservice;
party: string;
volunteers: Volunteer[];
registerForm: FormGroup;
dbSex: string;
dbPartyAffiliation: string;



  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, volunteerservice: Volunteerservice) {
  this.navCtrl = navCtrl;
  this.newVolunteer = null;
  this.volunteerKey = null;
  this.enterFullName = null;
  this.enterEmailAddress = null;
  this.enterExposeEmail = false;
  this.enterPhoneNumber = null;
  this.enterAge = null;
  this.enterSex = null;
  this.enterPartyAffiliation = null;
  this.enterPartyAffiliationFromList = null;
  this.enterShifts = '';
  this.enterPasscode = null;
  this.enterPasscode1 = null;
  this.enterPasscode2 = null;
  this.enterTotalRecords = null;
  this.enterTotalVoteRecords = null;
  this.enterTotalAnomalyRecords = null;
  this.enterTotalAmendmentRecords = null;
  this.enterOtherPartyAffiliation = null;
  this.volunteerservice = volunteerservice;
  this.volunteers = this.volunteerservice.getVolunteers();

  
        //form stuff
        var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
        var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
        var regExAge: string = '[1]*[0-9]?[0-9]';

        this.registerForm = fb.group({  
            'enterFullName': ['', Validators.compose([Validators.required])],
            'enterEmailAddress': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExEmail)])],
            //'exposeEmailCtrl': [this.newVolunteer.exposeEmail],
            'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExPhone)])],
            'enterAge': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(regExAge)])],
            'sexCtrl': ['' , Validators.required],
            'partyAffiliationCtrl': ['' , Validators.required],
           // 'otherPartyAffiliationCtrl': [this.currentTempVolunteer.partyAffiliation],
            //'shiftsCtrl': [this.newVolunteer.shifts],
            'enterOtherPartyAffiliation':[''],
            'enterPasscode1': ['', Validators.required],
            'enterPasscode2': ['', Validators.required],

        });




//ATTEMP TO FIX PROBLEM

        this.newVolunteer = {
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
}


        askToExposeEmail(){

                    
                let confirm = this.alertCtrl.create({
                title: 'Would you like to expose your email address to your team?',
                message: 'This will help you organize with each other before and on election day. You can change this setting later in your account.',
                buttons: [
                    {
                    text: 'No',
                    handler: () => {
                        this.enterExposeEmail = false;
                        console.log('Disagree clicked');
                    }
                    },
                    {
                    text: 'Yes',
                    handler: () => {
                        this.enterExposeEmail = true;
                        console.log('Agree clicked' + this.enterExposeEmail);
                        
                    }
                    }
                ]
                });
                confirm.present();
        }





    onSubmit(value: any): void {

            if(value.enterPasscode1 == value.enterPasscode2){
            this.newVolunteer.passcode = value.enterPasscode1;
            } else {

                let pcalert = this.alertCtrl.create({
                    title: 'Passwords do not match',
                    subTitle: 'Please re-enter your passcodes.',
                    buttons: ['OK'] 
                });
                pcalert.present();
                return;
            }




// SET VALUES FROM TEXT INPUTS
        //if(this.registerForm.valid) {
            //console.log('Submitted value: ', value);
            this.newVolunteer.fullName = value.enterFullName;
            this.newVolunteer.emailAddress = value.enterEmailAddress;
            this.newVolunteer.phoneNumber = value.enterPhoneNumber;
            this.newVolunteer.age = value.enterAge;
            this.newVolunteer.sex = this.enterSex;

            if (this.enterPartyAffiliationFromList!="Other Party"){
             this.newVolunteer.partyAffiliation = this.enterPartyAffiliationFromList;
            } else if (this.enterPartyAffiliationFromList=="Other Party" && value.enterOtherPartyAffiliation){
            this.newVolunteer.partyAffiliation = value.enterOtherPartyAffiliation;
            }

            //this.currentTempVolunteer.partyAffiliation = value.partyAffiliationCtrl;

        

            
            this.volunteerservice.printVolunteer(this.newVolunteer);
             
        

        
            //generate key for new volunteer
             this.newVolunteer.volunteerKey = this.volunteerservice.generateVolunteerKey();

             //expose emailAddress
             this.newVolunteer.exposeEmail = this.enterExposeEmail;

                this.newVolunteer.associatedPollingStationKey = '';
                this.newVolunteer.totalRecords = 0;
                this.newVolunteer.totalVoteRecords = 0;
                this.newVolunteer.totalAnomalyRecords = 0;
                this.newVolunteer.totalAmendmentRecords = 0;

        
                    
// set new volunteer
                    this.volunteerservice.setNewVolunteer(this.newVolunteer);

                    // console.log('hello ' + this.newVolunteer.fullName);

                     //push volunteer to volunteerlist IS WORKING? CONSOLE LOG NOT WORKING
                     this.volunteers.push(this.newVolunteer);
                     //console.log(this.volunteers);
        
            
        // then
                    //if (this.newVolunteer.fullName !== null){
                    let alert = this.alertCtrl.create({
                    title: 'Registration Successful',
                    subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).',
                    buttons: ['OK'] 
                });
                alert.present();

                    
         
    
// then

        try {
            
                this.navCtrl.setRoot(RegistrationsuccessPage, {
                });
            
        } catch (EE) {
                console.log('error in Submitting, exc='+ EE.toString())
        }
               
   // }
    

    }
}
