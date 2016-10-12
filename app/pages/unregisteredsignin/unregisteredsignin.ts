import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

import { Volunteer} from '../../volunteer.ts';
import { VOLUNTEERS} from '../../volunteerlist.ts';

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
enterTotalRecords: number;
enterTotalVoteRecords: number;
enterTotalAnomalyRecords: number;
enterTotalAmendmentRecords: number;
enterOtherPartyAffiliation: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
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
  this.enterTotalRecords = null;
  this.enterTotalVoteRecords = null;
  this.enterTotalAnomalyRecords = null;
  this.enterTotalAmendmentRecords = null;
  this.enterOtherPartyAffiliation = null;
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
                    VOLUNTEERS.push({
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
                    });

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
    



            onChangeName(value){
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

}

/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. */