import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';

// page to navigate to
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';

import { PollingStation } from '../../pollingstation';
import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';

// interfaces
import { Volunteer} from '../../volunteer'; 

//providers
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';
import {RestService} from '../../providers/rest-service/rest-service';

// pipes
import { Searchpipe } from '../../pipes/searchpipe';

import * as globals from '../../globals';

@Component({
  templateUrl: 'build/pages/findpollinglocation/findpollinglocation.html',
  inputs: ['pollingstation', 'volunteer'],
  pipes: [Searchpipe],
  //providers: [Searchpipe],
  directives: [PollingstationComponent,Headerc]
})


export class FindpollinglocationPage {
  currentVolunteer: Volunteer; 
  stations: PollingStation[];
  selectedStation: PollingStation;
  pollingStationService: Pollingstationservice;
  searchpipe: Searchpipe;
  titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, navParams: NavParams, 
                pollingStationService: Pollingstationservice,private restSvc: RestService ) {
  this.navCtrl = navCtrl;
  this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
  this.stations = pollingStationService.getStations();
  this.pollingStationService = pollingStationService;
  this.restSvc.getLatestPollStations();
  console.log('pollingstation=' + this.pollingStationService);
  console.log('stations=' + this.stations);  
  //this.searchpipe = searchpipe;
  // console.log('searchpipe=' + this.searchpipe);  
  }


  showStationDetails(variablePassedFromItem){


  this.selectedStation = variablePassedFromItem;
  console.log('selectedStation'+ this.selectedStation);
  this.pollingStationService.setStation(this.selectedStation);
  this.pollingStationService.printSelectedStation();
      try {
          this.navCtrl.push(PollingstationdetailsPage, {
              title: globals.PSDETAILTITLE,
              menupg: this.titlec.page
          });
      } catch (EE) {
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }
  
}

