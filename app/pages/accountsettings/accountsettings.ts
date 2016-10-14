import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
//import {VotePage} from '../vote/vote';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice'


@Component({
  templateUrl: 'build/pages/accountsettings/accountsettings.html',
  inputs: ['volunteer']
})




export class AccountsettingsPage {

currentVolunteer: Volunteer; 
exposedYesOrNo: string;
volunteerservice: Volunteerservice;

  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice) {
      this.navCtrl = navCtrl;
      this.volunteerservice = volunteerservice; 
      if(volunteerservice.currentVolunteer!==null){
      this.currentVolunteer = volunteerservice.getNewVolunteer();
        }
      

      // get exposed value
      if(volunteerservice.currentVolunteer!==null){
      this.exposedYesOrNo = this.volunteerservice.isEmailExposed(this.currentVolunteer);
      }

  }

       onSubmit() {
        var that = this;
        try {
                //that.navCtrl.push(VotePage, {
                //});
            

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
