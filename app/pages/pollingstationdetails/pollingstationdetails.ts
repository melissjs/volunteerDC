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


        checkArrayForTimeOfDay(passedShifts){
           // var shiftIterated: string;
            for (var i = 0; i < passedShifts.length; i++) {
             // if (shiftIterated[i] == "Morning")
                if (passedShifts[i] == "Morning"){
                  return "M";
                }
                if (passedShifts[i] == "Afternoon"){
                  return "A";
                }
            }
            
        }


}
