import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

import { Volunteer} from '../../volunteer';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice'
//import { VOLUNTEERS} from '../../volunteerlist.ts';
import {RestService} from '../../providers/rest-service/rest-service';

import * as globals from '../../globals';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';




@Component({
    templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
    //providers: [RestService]
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
    properties: any;
    loggedIn: boolean;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestService,  volunteerservice: Volunteerservice) {
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
        this.restSvc = restSvc;
        this.properties = null;
        this.loggedIn = false;

        //form stuff
        var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
        var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
        var regExAge: string = '[1]*[0-9]?[0-9]';

        this.registerForm = fb.group({  
            'enterFullName': ['', Validators.compose([Validators.required])],
            'enterEmailAddress': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExEmail)])],
            'enterExposeEmailCtrl': ['',  Validators.required],
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

    onChangeFullName(value){
        this.enterFullName = value;
    }

    onChangeEmail(value){
        this.enterEmailAddress = value;

    }

    /*
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
    */

    onChangeExposeEmail(value){
        var newval = !value;
        console.log('signature selected:' + newval);
        this.enterExposeEmail = newval;
    }

    onChangePhoneNumber(value){
        this.enterPhoneNumber = value;
    }

    onChangeAge(value){
        this.enterAge = value;
    }

    onChangeSex(value){
        this.enterSex = value;
    }

    onChangePartyAffiliationFromList(value, otherParty, passcode){
        this.enterPartyAffiliationFromList = value;
        /*if (this.enterPartyAffiliationFromList!=="other"){
          this.enterOtherPartyAffiliation=null;
          this.enterPartyAffiliation=this.enterPartyAffiliationFromList;
          }*/
        if (value == "Other Party") {
            otherParty.setFocus();
        } else {
            passcode.setFocus();
        }
    }

    onChangeOtherPartyAffiliation(value){
        this.enterOtherPartyAffiliation = value;
        /*if (this.enterPartyAffiliationFromList=="other" && this.enterOtherPartyAffiliation!==null){
          this.enterPartyAffiliation=this.enterOtherPartyAffiliation;
          }*/
    }

    onChangePasscode1(value){
        this.enterPasscode1 = value;
    }

    onChangePasscode2(value){
        this.enterPasscode2 = value;
        if (this.enterPasscode1==this.enterPasscode2){
            this.enterPasscode=this.enterPasscode1;
        }
    }

    presentVerificationInit() {
        let alertpvi = this.alertCtrl.create({
            title: 'Verify Phone Number',
            subTitle: 'How would you like to be sent the code',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked.. nothing to do');
                    }
                },
                {
                    text: 'Voice Call',
                    handler: data => {
                        let navTransition = alertpvi.dismiss();
                        this.verifyPhoneNumber('call');
                    }
                },
                {
                    text: 'SMS Text',
                    handler: data => {
                        let navTransition = alertpvi.dismiss();
                        this.verifyPhoneNumber('sms');
                    }
                }
            ]
        });
        //timeout the error to let other modals finish dismissing.
        setTimeout(()=>{
            alertpvi.present();
        },500);
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

        //generate key for new volunteer
        this.newVolunteer.volunteerKey = this.volunteerservice.generateVolunteerKey();

        //expose emailAddress
        this.newVolunteer.exposeEmail = this.enterExposeEmail;

        this.newVolunteer.associatedPollingStationKey = null;
        this.newVolunteer.totalRecords = 0;
        this.newVolunteer.totalVoteRecords = 0;
        this.newVolunteer.totalAnomalyRecords = 0;
        this.newVolunteer.totalAmendmentRecords = 0;
        
        

        

        // set new volunteer
        this.volunteerservice.setNewVolunteer(this.newVolunteer);

        //push volunteer to volunteerlist IS WORKING? CONSOLE LOG NOT WORKING
        this.volunteers.push(this.newVolunteer);
        this.volunteerservice.setNewVolunteer(this.newVolunteer);
        this.loggedIn = true;
        this.restSvc.setLoggedIn(this.loggedIn);
        console.log(this.loggedIn + '' + this.restSvc.loggedIn);
        
        


        // ERICS Call
        this.presentVerificationInit();

        /*
          comment out mine
          // then
          //if (this.newVolunteer.fullName !== null){
          let alert = this.alertCtrl.create({
          title: 'Registration Successful',
          subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).',
          buttons: ['OK'] 
          });
          alert.present();
          
          
          
          // then
          =======
          //push volunteer to volunteerlist IS WORKING? CONSOLE LOG NOT WORKING
          this.volunteers.push(this.newVolunteer);
          //console.log(this.volunteers);
          
          
          // ERICS Call
          this.presentVerificationInit();

          /*
          comment out mine
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
        */
        
    }

    //end onsubmit
    
    presentVerificationCheck(subtitle:string) {
        var that = this;
        let alertpvc = this.alertCtrl.create({
            title: 'Verify Code',
            subTitle: subtitle,
            inputs: [
                {
                    name: 'vcode',
                    placeholder: '1234'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        alertpvc.dismiss();
                        console.log('Cancel clicked.. nothing to do');
                    }
                },
                {
                    text: 'OK',
                    role: 'submit',
                    handler: data => {
                        console.log('data=' + data.vcode);
                        if ((data.vcode != null) &&
                            (data.vcode.match("[0-9]{4}"))) {
                            alertpvc.dismiss();
                            that.verifyCode(data.vcode);
                        } else {
                            alertpvc.dismiss();
                            this.presentVerificationCheck('Invalid Code Entered, Try Again...');
                        }
                    }
                }
            ]
        });
        //timeout the error to let other modals finish dismissing.
        setTimeout(()=>{
            alertpvc.present();
        },500);
    }

    verifyPhoneNumber(via: string) {
        var that = this;
        try {
            that.restSvc.sendAuthyRequest(via,that.newVolunteer.phoneNumber)
                .subscribe( data => {
                    that.properties = data;
                    console.log('successful call:' + that.properties);
                    if (that.properties.success) {
                        var csrfToken = data._csrf;
                        if (csrfToken != null) {
                            that.restSvc.setCsrfToken(csrfToken[0]);
                        }
                        that.presentVerificationCheck('Enter the 4 digit code');
                    } else {
                        let alert = that.alertCtrl.create({
                            title: 'Error Verifying Phone',
                            subTitle: that.properties.message,
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
                        },500);
                    }
                }, err => {
                    console.log('error occurred ' + err.toString());
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        that.properties = "Unknown Error!";
                        this.testError();
                        return;
                    } else {
                        that.properties = err.toString();
                    }
                    // console.log(error.stack());
                    let alert = that.alertCtrl.create({
                        title: 'Error Verifying Phone',
                        subTitle: that.properties,
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
                    },500);
                }, () => {console.log('registration complete')});
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString())
            let alert2 = that.alertCtrl.create({
                title: 'Error Authorizing',
                subTitle: 'There was a problem sending '
                    + 'your token - sorry :(' + err.toString(),
                buttons: ['OK']
            });
            alert2.present();
        }
        
    }

    verifyCode(code: string) {
        var that = this;
        try {
            that.restSvc.sendAuthyVerify(that.newVolunteer.phoneNumber, code)
                .subscribe( data => {
                    that.properties = data;
                    console.log('successful call:' + that.properties);
                    if (that.properties.success) {
                        this.sendVerificationEmail();
                    } else {
                        this.presentVerificationCheck('Incorrect Code Entered, Try Again...');
                    }
                }, err => {
                    console.log('error occurred ' + err.toString());
                    if (err.status == 0) {
                        that.properties = "Unknown Error!";
                    } else {
                        that.properties = err.toString();
                    }
                    // console.log(error.stack());
                    let alert = that.alertCtrl.create({
                        title: 'Error Verifying Phone',
                        subTitle: that.properties,
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
                    },500);
                }, () => {console.log('registration complete')});
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString())
            let alert2 = that.alertCtrl.create({
                title: 'Error Authorizing',
                subTitle: 'There was a problem sending '
                    + 'your token - sorry :(' + err.toString(),
                buttons: ['OK']
            });
            alert2.present();
        }
    }

    successForward(real:boolean) {
        var subtitle;
        var that = this;
        if (real) {
            subtitle = 'You should shortly receive an email.  Please click on the link in the email to verify your email address';
        } else {
            subtitle = 'For TESTING PURPOSES, we simulate success here.  You would expect to receive an email.  and be told to Please click on the link in the email to verify your email address';
        }
        let alert = that.alertCtrl.create({
            title: 'Verification Successful',
            /* subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).', */
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
        },500);
        // Send to token verification page
        that.navCtrl.push(RegistrationsuccessPage, {
        });
    }

    testError() {
        // Only happens when we don't actually have a real server to talk to..
        this.successForward(false);
    }

    sendVerificationEmail() {
        var that = this;
        try {
            that.restSvc.registerUser(that.newVolunteer)
                .subscribe( (data) => {
                    that.properties = data;
                    // Expect response created here...
                    if (data.status == 201) {
                        console.log('successful call:' + that.properties);
                        this.successForward(true);
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + that.properties);
                        this.successForward(true);              
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    if (err.status == 400) {
                        that.properties = err._body // toString();
                    } else {
                        that.properties = err.toString();
                    }
                    // console.log(error.stack());
                    let alert = that.alertCtrl.create({
                        title: 'Error Registering Account',
                        subTitle: that.properties,
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
                    },500);
                }, () => {console.log('registration(register) complete')}
                );
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString())
            let alert2 = that.alertCtrl.create({
                title: 'Error Authorizing',
                subTitle: 'There was a problem sending '
                    + 'your token - sorry :(' + err.toString(),
                buttons: ['OK']
            });
            alert2.present();
        }
    }

}
/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. 
     */ 
