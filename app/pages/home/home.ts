import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

import {VolunteerPage} from '../volunteer/volunteer';
import {DonatePage} from '../donate/donate';



@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {


  //userDataSvc: UserDataService;

  constructor(public navCtrl: NavController, navParams: NavParams) {

      this.navCtrl = navCtrl;
     //this.userDataSvc = userDataSvc; // navParams.get('userDataSvc');
      //if (this.userDataSvc) {
     //    this.userDataSvc.setupFirebase();
     //}
  }

   /* onSubmit() {
        var that = this;
        try {
           that.navCtrl.push(QuestionsPage, {
		    userDataSvc: this.userDataSvc
            });

        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }*/
    
onVolunteerClick(){
    var that = this;
        try {
           that.navCtrl.push(VolunteerPage, {
		    
            });
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }

}   

onDonateClick(){
var that = this;
        try {
           that.navCtrl.push(DonatePage, {
		    
            });
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }
}  




}
