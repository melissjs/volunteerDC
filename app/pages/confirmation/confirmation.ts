import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { PollingStation} from '../../pollingstation';
//import {VotePage} from '../vote/vote';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';
import {RestService} from '../../providers/rest-service/rest-service';
/*
  Generated class for the ConfirmationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/confirmation/confirmation.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent]
})
export class ConfirmationPage {
currentVolunteer: Volunteer; 
fullVolunteerList: Volunteer[];
volunteerservice: Volunteerservice;
pollingstationservice: Pollingstationservice;
thisTempStation: PollingStation;
thisTempStationPrecint: string;
printedShifts: string;


  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice,  private restSvc: RestService, private alertCtrl: AlertController) {
        this.navCtrl = navCtrl;
        this.volunteerservice = volunteerservice; 
        this.pollingstationservice = pollingstationservice;
        this.restSvc = restSvc;
        this.volunteerservice.associatedVolunteerArray = [];

         if(this.restSvc.getLoggedIn()){
          this.currentVolunteer = this.volunteerservice.getNewVolunteer();
         }

          if(this.currentVolunteer.associatedPollingStationKey!==null){
        this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentVolunteer.associatedPollingStationKey)
        this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
       }

        //get associate volunteer keys
        if(this.currentVolunteer.associatedPollingStationKey!==null){
             this.fullVolunteerList = this.volunteerservice.getTeamVolunteersByPollKey(this.currentVolunteer.associatedPollingStationKey)
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

     askShifts(){
        let confirm = this.alertCtrl.create({
            title: 'Would you like to cancel your shifts?',
            message: 'If you want to change times or stations, head over to the polling station pages.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Disagree clicked' + this.currentVolunteer.shifts);
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        
                        //this.volunteerservice.clearShifts()
                        this.currentVolunteer.shifts = '';
                        this.printedShifts = "None";
                        this.currentVolunteer.associatedPollingStationKey = null;
                        this.volunteerservice.associatedVolunteerArray = [];
                        console.log('Agree clicked' + this.currentVolunteer.shifts);
                        
                    }
                }
            ]
        });
        confirm.present();
    }


  

}
