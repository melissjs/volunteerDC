import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrationsuccessPage} from '../registrationsuccess/registrationsuccess';

@Component({
  templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
})
export class UnregisteredsigninPage {
enterSex: string;
enterParty: string;
enterShift: string;


  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
  this.navCtrl = navCtrl;
  this.enterSex = null;
  this.enterParty = null;
  this.enterShift = null;
  }

    onSubmit() {
        var that = this;

if (this.enterSex == null){
         let alert = this.alertCtrl.create({
                    title: 'Registration Successful',
                    subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).',
                    buttons: ['OK'] 
                });
                alert.present();}


        try {
            
                that.navCtrl.push(RegistrationsuccessPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

            onChangeSex(value){
        this.enterSex = value;
   }

           onChangeParty(value){
        this.enterParty = value;
   }

}

/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. */