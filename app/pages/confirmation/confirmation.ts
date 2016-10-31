import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';

import { Volunteer} from '../../volunteer';
import { PollingStation} from '../../pollingstation';
//import {VotePage} from '../vote/vote';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';
import {RestService} from '../../providers/rest-service/rest-service';

import * as globals from '../../globals';

/*
  Generated class for the ConfirmationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/confirmation/confirmation.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent, Headerc]
})
export class ConfirmationPage {
currentVolunteer: Volunteer; 
volunteerservice: Volunteerservice;
pollingstationservice: Pollingstationservice;
thisTempStation: PollingStation;
thisTempStationPrecint: string;
printedShifts: string;
titlec: {page: any, title: string};

  constructor(private navCtrl: NavController, navParams: NavParams, 
              volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice,  
              private restSvc: RestService, private alertCtrl: AlertController) {
        this.navCtrl = navCtrl;
        this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
        this.volunteerservice = volunteerservice; 
        this.pollingstationservice = pollingstationservice;
        this.restSvc = restSvc;
        this.volunteerservice.associatedVolunteerArray = [];

      if(this.restSvc.getLoggedIn()){
          this.currentVolunteer = this.volunteerservice.getNewVolunteer();

          if(this.currentVolunteer.associatedPollingStationKey!==null){

              this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentVolunteer.associatedPollingStationKey)
              if (this.thisTempStation != null) {
                  this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
              }
          }

      }
  }
    
    goToStationDetails(){
        console.log('thisTempStation'+ this.thisTempStation);
        this.pollingstationservice.setStation(this.thisTempStation);
        var that = this;
        try {
            
            this.navCtrl.push(PollingstationdetailsPage, {
                title: globals.PSDETAILTITLE,
                menupg: this.titlec.page
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
                        
                        this.volunteerservice.clearShifts()
                        this.currentVolunteer.shifts = '';
                        this.printedShifts = "None";
                        this.currentVolunteer.associatedPollingStationKey = null;
                        this.volunteerservice.setPollingStationForVolunteer(null);

                        var that = this;
                        this.restSvc.saveVolunteerInfo()
                            .subscribe( (data) => {
                                // Expect response created here...
                                if (data.status == 200)  {
                                    console.log('successful call to save:' + data);
                                    this.successForward(true);
                                } else {
                                    // ?? shouldn't happen ??
                                    console.log('UNKNOWN STATUS:' + data);
                                    this.successForward(true);              
                                }
                            } , err => {
                                console.log('error occurred ' + err.toString());
                                var errStr = null;
                                if ((err.status == 0) ||
                                    (err.status == 404)) {
                                    this.successForward(false);
                                } else if (err.status == 400) {
                                    errStr = err._body // toString();
                                } else {
                                    errStr = err.toString();
                                }
                                // console.log(error.stack());
                                let alert = that.alertCtrl.create({
                                    title: 'Error Saving Account Settings',
                                    subTitle: errStr,
                                    buttons: [{
                                        text: 'OK',
                                        handler: () => {
                                            alert.dismiss();
                                        }
                                    }]
                                }
                                                                 );
                                //timeout the error to let other modals finish dismissing.
                                setTimeout(()=>{
                                    alert.present();
                                },250);
                            }, () => {console.log('save polling details complete')}
                                      );

                        console.log('Agree clicked' + this.currentVolunteer.shifts);
                        
                    }
                }
            ]
        });

        confirm.present();
    }

    successForward(real:boolean) {


        if (!real) {
            this.volunteerservice.overWriteChangesToVolunteer(this.currentVolunteer);
        }

        this.volunteerservice.printVolunteer(this.currentVolunteer);
        console.log('confirmation after submit ');

    }

}
