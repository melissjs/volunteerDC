import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import {PollingstationdetailsPage} from '../pollingstationdetails/pollingstationdetails';



@Component({
  templateUrl: 'build/pages/addpollinglocation/addpollinglocation.html',
})
export class AddpollinglocationPage {

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
  this.navCtrl = navCtrl;
  }

      onSubmit() {
            var that = this;
            if (this !== null){
            let alert = this.alertCtrl.create({
                        title: 'Addition Successful',
                        subTitle: 'Congratulations you have successfully initiated a new audit! This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.',
                        buttons: ['OK'] 
                    });
                    alert.present();
            }


            try {
                that.navCtrl.push(PollingstationdetailsPage, {});
                } catch (EE) {
                console.log('error in Submitting, exc='+ EE.toString())
                }

        }




}
