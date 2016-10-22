import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// page to navigate to
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';
import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';

import { PollingStation } from '../../pollingstation';
import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';

// interfaces
import { Volunteer} from '../../volunteer'; 

//providers
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';

/*
  Generated class for the DuplicatepollingstationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/duplicatepollingstation/duplicatepollingstation.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent]
})
export class DuplicatepollingstationPage {
  pollingStationService: Pollingstationservice;
  alertMsg: string;
  alertMsgHeading: string;
  constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice) {
  var that = this;
  this.navCtrl = navCtrl;
  this.pollingStationService = pollingStationService;
  

  if (this.pollingStationService.matchingPrecinctAndZipList.length>1){
  this.alertMsg = "Possible duplicates are already in the station list. To avoid confusion, please do not add a duplicate of the same exact polling location. Do you still wish to add your station to the list?";
  this.alertMsgHeading = "Existing Stations";
} else {
  this.alertMsg = "A possible duplicate location was found already in the list. To avoid confusion, please do not add a duplicate of the same exact polling location. Do you still wish to add your station to the list?";
  this.alertMsgHeading = "Existing Station";
}
  }

onCancel(){
   console.log('cancel');
this.pollingStationService.duplicateYesOrNo = false;
this.pollingStationService.matchingPrecinctAndZipList = [];
//this.pollingStationService.selectedStation = null;
// zero out selectedStation
this.pollingStationService.selectedStation = {
          pollingStationKey: '',
          precinctNumber: '',
          streetAddress: '',
          unitNumber: '',
          roomNumber: '',
          city: '',
          state: '',
          zip: null,
}
   try {
                this.navCtrl.setRoot(FindpollinglocationPage, {});            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
}

onAdd(){
  this.pollingStationService.duplicateYesOrNo = false;
  this.pollingStationService.matchingPrecinctAndZipList = [];
  this.pollingStationService.stationListInMemory.push(this.pollingStationService.selectedStation);
     try {
            
                this.navCtrl.setRoot(PollingstationdetailsPage, {}); 
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
}




}
