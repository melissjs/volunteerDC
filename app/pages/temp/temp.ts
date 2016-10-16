import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
import { PollingStation} from '../../pollingstation';
//import {VotePage} from '../vote/vote';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';


@Component({
  templateUrl: 'build/pages/temp/temp.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent],
})
export class TempPage {
currentVolunteer: Volunteer; 
exposedYesOrNo: string;
volunteerservice: Volunteerservice;
pollingstationservice: Pollingstationservice;
currentTempVolunteer: Volunteer;
thisTempStation: PollingStation;
thisTempStationPrecint: string;


  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice) {
      this.navCtrl = navCtrl;
      this.volunteerservice = volunteerservice; 
      this.pollingstationservice = pollingstationservice;
      if(volunteerservice.currentVolunteer!==null){
      this.currentVolunteer = volunteerservice.getNewVolunteer();
        }

this.currentTempVolunteer = {
volunteerKey: 'v5',
fullName: 'Raya Hammond',
emailAddress: 'email@email.com',
exposeEmail: true,
phoneNumber: '602-453-5544',
age: 23,
sex: 'Female',
partyAffiliation: 'Other Party',
shifts:['Late Morning', 'Early Evening'],
passcode: 'passcodestring',
associatedPollingStationKey:'ps1', 
totalRecords: 0,
totalVoteRecords: 0,
totalAnomalyRecords: 0,
totalAmendmentRecords: 0,
} 
      

      // get exposed value
      if(volunteerservice.currentVolunteer!==null){
      this.exposedYesOrNo = this.volunteerservice.isEmailExposed(this.currentVolunteer);
      }


      this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentTempVolunteer.associatedPollingStationKey)
      this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
//end constructor
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


      goToStationDetails(){
  console.log('thisTempStation'+ this.thisTempStation);
  this.pollingstationservice.setStation(this.thisTempStation);
  var that = this;
         try {
            
                this.navCtrl.push(PollingstationdetailsPage, {
                  });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
  }
  

}
