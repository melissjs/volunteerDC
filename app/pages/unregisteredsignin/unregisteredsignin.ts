import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

import { Volunteer} from '../../volunteer';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice'
//import { VOLUNTEERS} from '../../volunteerlist.ts';

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

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, volunteerservice: Volunteerservice) {
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
        if (this.newVolunteer.fullName !== null){
            let alert = this.alertCtrl.create({
                title: 'Registration Successful',
                subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).',
                buttons: ['OK'] 
            });
            alert.present();

            
        }
	
	// then

        try {
            
            that.navCtrl.push(RegistrationsuccessPage, {
            });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
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

}

/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. 
 */ 
