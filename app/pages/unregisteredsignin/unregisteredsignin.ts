import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

import { Volunteer} from '../../volunteer';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice'
//import { VOLUNTEERS} from '../../volunteerlist.ts';
import {RestService} from '../../providers/rest-service/rest-service';

@Component({
    templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
    providers: [RestService]
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
    properties: any;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, 
                private restSvc: RestService, volunteerservice: Volunteerservice) {
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
    }

    onSubmit() {
        var that = this;
        // first party logic
        if (this.enterPartyAffiliationFromList!=="other"){
            this.enterOtherPartyAffiliation=null;
            this.enterPartyAffiliation=this.enterPartyAffiliationFromList;
        }

        if (this.enterPartyAffiliationFromList=="other" && this.enterOtherPartyAffiliation!==null){
            this.enterPartyAffiliation=this.enterOtherPartyAffiliation;
        }
        
        //generate key for new volunteer
        this.volunteerKey = this.volunteerservice.generateVolunteerKey();

        //then fill object

        this.newVolunteer =
            {
                volunteerKey: this.volunteerKey,
                fullName: this.enterFullName,
                emailAddress: this.enterEmailAddress,
                exposeEmail: this.enterExposeEmail,
                phoneNumber: this.enterPhoneNumber,
                age: this.enterAge,
                sex: this.enterSex,
                partyAffiliation: this.enterPartyAffiliation,
                shifts: this.enterShifts,
                passcode: this.enterPasscode,
                associatedPollingStationKey: null,
                totalRecords: null,
                totalVoteRecords: null,
                totalAnomalyRecords: null,
                totalAmendmentRecords: null
            } 
        

        this.volunteerservice.setNewVolunteer(this.newVolunteer);

        console.log('hello ' + this.newVolunteer.fullName);

        //push volunteer to volunteerlist IS WORKING? CONSOLE LOG NOT WORKING
        this.volunteers.push(this.newVolunteer);
        console.log(this.volunteers);
        
        
        // then
        if ((this.newVolunteer.fullName == null) || /*
            (this.newVolunteer.emailAddress == null) || */
            (this.newVolunteer.phoneNumber == null) /* ||
            (this.newVolunteer.passCode == null) ||      
            (this.newVolunteer.passCheck == null) ||
            (this.newVolunteer.enterShift == null) */ ) {
            var reqFields = "";
            var first = true;
            /* if (this.newVolunteer.fullName == null) {
                reqFields += "Full Name";
                first = false;
            }
            if (this.newVolunteer.emailAddress == null) {
                if (!first) {
                    reqFields += ", ";
                }
                reqFields += "Email Address";
                first = false;
            } */
            if (this.newVolunteer.phoneNumber == null) {
                if (!first) {
                    reqFields += ", ";
                }
                reqFields += "Cell Phone";
                first = false;
            } /*
            if (this.newVolunteer.passCode == null) {
                if (!first) {
                    reqFields += ", ";
                }
                reqFields += "Passcode";
                first = false;
            }
            if (this.newVolunteer.passCheck == null) {
                if (!first) {
                    reqFields += ", ";
                }
                reqFields += "Re-entered Passcode";
                first = false;
            }
            */

            let alert = this.alertCtrl.create({
                title: reqFields + ' field(s) required.',
                subTitle: 'Please fill in all required fields.',
                buttons: ['OK']
            });
            alert.present();
        } else {

            /* if (that.passCode != that.passCheck) {
                let alert = this.alertCtrl.create({
                    title: 'Passcodes do not match',
                    subTitle: 'Please re-enter passcodes.',
                    buttons: ['OK']
                });
                alert.present();
            } else */ {

                this.presentVerificationInit();
            }
        }
    }

    onChangeFullName(value){
        this.enterFullName = value;
    }

    onChangeEmail(value){
        this.enterEmailAddress = value;

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
        
        
        /*if (this.enterEmailAddress !== null){
          let alert = this.alertCtrl.create({
          title: 'Expose Email to Team?',
          subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).',
          buttons: ['OK'] 
          });
          alert.present();}*/
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

    onChangePartyAffiliationFromList(value){
        this.enterPartyAffiliationFromList = value;
        /*if (this.enterPartyAffiliationFromList!=="other"){
          this.enterOtherPartyAffiliation=null;
          this.enterPartyAffiliation=this.enterPartyAffiliationFromList;
          }*/
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
                        this.presentVerificationCheck('Enter the 4 digit code');
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
                    if (err.toString().startsWith("Response with status: 0")) {
                        that.properties = "Unknown Error!";
                        this.successForward(false);
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
                        this.successForward(true);
                    } else {
                        this.presentVerificationCheck('Incorrect Code Entered, Try Again...');
                    }
                }, err => {
                    console.log('error occurred ' + err.toString());
                    if (err.toString().startsWith("Response with status: 0")) {
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

}

/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. 
 */ 
