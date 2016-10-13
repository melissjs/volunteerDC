import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// page to navigate to
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';

import { PollingStation } from '../../pollingstation.ts';
import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';

// interfaces
import { Volunteer} from '../../volunteer.ts';
import { Team } from '../../team.ts';

//providers
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice.ts';

// pipes
import { Searchpipe } from '../../pipes/searchpipe.ts';

//import { STATIONS } from '../../stationlist.ts';


@Component({
  templateUrl: 'build/pages/findpollinglocation/findpollinglocation.html',
  inputs: ['pollingstation', 'volunteer', 'team'],
  pipes: [Searchpipe],
  //providers: [Searchpipe],
  directives: [PollingstationComponent]
})


export class FindpollinglocationPage {
  currentVolunteer: Volunteer; 
  currentTeam: Team;
  stations: PollingStation[];
  selectedStation: PollingStation;
  pollingStationService: Pollingstationservice;
  //searchpipe: Searchpipe;

  constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice ) {
  var that = this;
  this.navCtrl = navCtrl;
  this.stations = pollingStationService.getStations();
  this.pollingStationService = pollingStationService;
  //this.searchpipe = searchpipe;
  }


  showStationDetails(variablePassedFromItem){
  this.selectedStation = variablePassedFromItem;
  console.log('selectedStation'+ this.selectedStation);
  this.pollingStationService.setStation(this.selectedStation);
  this.pollingStationService.printSelectedStation();
  var that = this;
         try {
            
                this.navCtrl.push(PollingstationdetailsPage, {
                  });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
  }

  
}

