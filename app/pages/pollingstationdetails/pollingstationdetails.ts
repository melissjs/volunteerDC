import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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


      constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice ) {
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




        /*checkArrayForTimeOfDay(passedShifts){
           // var shiftIterated: string;
            for (var i = 0; i < passedShifts.length; i++) {
             // if (shiftIterated[i] == "Morning")
                if (passedShifts[i] == "Early Morning"){
                  return "EM";
                }
                if (passedShifts[i] == "Late Morning"){
                  return "LM";
                }
                if (passedShifts[i] == "Early Afternoon"){
                  return "EA";
                }
                if (passedShifts[i] == "Late Afternoon"){
                  return "LA";
                }
                if (passedShifts[i] == "Early Evening"){
                  return "EE";
                }
                if (passedShifts[i] == "Late Evening"){
                  return "LE";
                }
            }
            
        }*/
 }
