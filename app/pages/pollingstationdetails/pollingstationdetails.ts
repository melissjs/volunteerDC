import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';
import { Volunteer} from '../../volunteer.ts';
import { Team } from '../../team.ts';
import { PollingStation } from '../../pollingstation.ts';

import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice.ts';


@Component({
  templateUrl: 'build/pages/pollingstationdetails/pollingstationdetails.html',
  inputs: ['pollingstation', 'volunteer', 'team'],
  directives: [PollingstationComponent],
  //providers: [Pollingstationservice]
})
      export class PollingstationdetailsPage {
      currentVolunteer: Volunteer; 
      currentTeam: Team;
      stations: PollingStation[];
      pollingStationService: Pollingstationservice;

      eM: boolean = false;
      lM: boolean = false;
      eA: boolean = false;
      lA: boolean = false;
      eE: boolean = false;
      lE: boolean = false;

      constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice, private alertCtrl: AlertController ) {
      this.pollingStationService = pollingStationService;
      //var passedStations = this.pollingStationService.selectedStation;
        }





            checkEarlyMorning(passedShifts){
            for (var i = 0; i < passedShifts.length; i++) {
                if (passedShifts[i] == "Early Morning"){
                  return true;
                }
            }
            }

            checkLateMorning(passedShifts){
            for (var i = 0; i < passedShifts.length; i++) {
                if (passedShifts[i] == "Late Morning"){
                  return true;
                }
            }
            }

            checkEarlyAfternoon(passedShifts){
            for (var i = 0; i < passedShifts.length; i++) {
                if (passedShifts[i] == "Early Afternoon"){
                  return true;
                }
            }
            }

            checkLateAfternoon(passedShifts){
            for (var i = 0; i < passedShifts.length; i++) {
                if (passedShifts[i] == "Late Afternoon"){
                  return true;
                }
            }
            }

            checkEarlyEvening(passedShifts){
            for (var i = 0; i < passedShifts.length; i++) {
                if (passedShifts[i] == "Early Evening"){
                  return true;
                }
            }
            }

            checkLateEvening(passedShifts){
            for (var i = 0; i < passedShifts.length; i++) {
                if (passedShifts[i] == "Late Evening"){
                  return true;
                }
            }
            }

  onChangeEarlyM(value) {
     var earlyM = !value;
    console.log('signature selected:' + earlyM);
    this.eM = earlyM;
  }

  onChangeLateM(value) {
     var lateM = !value;
    console.log('signature selected:' + lateM);
    this.lM = lateM;
  }


  onChangeEarlyA(value) {
     var EarlyA = !value;
    console.log('signature selected:' + EarlyA);
    this.eA = EarlyA;
  }

    onChangeLateA(value) {
     var LateA = !value;
    console.log('signature selected:' + LateA);
    this.lA = LateA;
  }


    onChangeEarlyE(value) {
     var EarlyE = !value;
    console.log('signature selected:' + EarlyE);
    this.eE = EarlyE;
  }

      onChangeLateE(value) {
     var LateE = !value;
    console.log('signature selected:' + LateE);
    this.lE = LateE;
  }


          onSubmit(){
            if ((this.eM == true) || (this.lM) || (this.eA) || (this.lA) || (this.eE) || (this.lE) ){
         let alert = this.alertCtrl.create({
                    //title: 'Please confirm',
                    subTitle: 'I have read this statement and confirm that I understand the terms for participating in this audit.',
                    buttons: ['CONFIRM'] 
                });
                alert.present();}

          }

 }
