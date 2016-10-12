import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

import { Volunteer} from '../../volunteer.ts';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice.ts'
//import { VOLUNTEERS} from '../../volunteerlist.ts';

@Component({
  templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
})
export class UnregisteredsigninPage {
newVolunteer: Volunteer;
enterFullName: string;
enterEmailAddress: string;
enterPhoneNumber: string;
enterAge: number;
enterSex: string;
enterPartyAffiliation: string;
enterShifts: string[];
enterPasscode: string;
enterPasscode1: string;
enterPasscode2: string;
enterTotalRecords: number;
enterTotalVoteRecords: number;
enterTotalAnomalyRecords: number;
enterTotalAmendmentRecords: number;
enterOtherPartyAffiliation: string;
volunteerservice: Volunteerservice;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, volunteerservice: Volunteerservice) {
  this.navCtrl = navCtrl;
  this.newVolunteer = null;
  this.enterFullName = null;
  this.enterEmailAddress = null;
  this.enterPhoneNumber = null;
  this.enterAge = null;
  this.enterSex = null;
  this.enterPartyAffiliation = null;
  this.enterShifts = null;
  this.enterPasscode = null;
  this.enterPasscode1 = null;
  this.enterPasscode2 = null;
  this.enterTotalRecords = null;
  this.enterTotalVoteRecords = null;
  this.enterTotalAnomalyRecords = null;
  this.enterTotalAmendmentRecords = null;
  this.enterOtherPartyAffiliation = null;
  this.volunteerservice = volunteerservice;
  }

    onSubmit() {
        var that = this;

                    this.newVolunteer =
                    {
                        fullName: this.enterFullName,
                        emailAddress: this.enterEmailAddress,
                        phoneNumber: this.enterPhoneNumber,
                        age: this.enterAge,
                        sex: this.enterSex,
                        partyAffiliation: this.enterPartyAffiliation,
                        shifts: this.enterShifts,
                        passcode: this.enterPasscode,
                        totalRecords: null,
                        totalVoteRecords: null,
                        totalAnomalyRecords: null,
                        totalAmendmentRecords: null
                    } 
                    /*VOLUNTEERS.push({
                        fullName: this.enterFullName,
                        emailAddress: this.enterEmailAddress,
                        phoneNumber: this.enterPhoneNumber,
                        age: this.enterAge,
                        sex: this.enterSex,
                        partyAffiliation: this.enterPartyAffiliation,
                        shifts: this.enterShifts,
                        passcode: this.enterPasscode,
                        totalRecords: null,
                        totalVoteRecords: null,
                        totalAnomalyRecords: null,
                        totalAmendmentRecords: null
                    });*/

                    this.volunteerservice.setNewVolunteer(this.newVolunteer);

                     console.log(this.newVolunteer);

        
            
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
           this.enterPartyAffiliation = value;
           }

           onChangePhoneNumber(value){
           this.enterPartyAffiliation = value;
           }

            onChangeAge(value){
            this.enterSex = value;
            }

            onChangeSex(value){
            this.enterSex = value;
            }

           onChangePartyAffiliation(value){
           this.enterPartyAffiliation = value;
           }

           onChangeOtherPartyAffiliation(value){
            this.enterOtherPartyAffiliation = value;
            if (this.enterOtherPartyAffiliation!==null){
                this.enterPartyAffiliation=this.enterOtherPartyAffiliation;
            }
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

/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. */