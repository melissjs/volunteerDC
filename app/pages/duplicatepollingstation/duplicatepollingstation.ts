import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';


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
import {RestService} from '../../providers/rest-service/rest-service';

import * as globals from '../../globals';

/*
  Generated class for the DuplicatepollingstationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/duplicatepollingstation/duplicatepollingstation.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent, Headerc]
})
export class DuplicatepollingstationPage {
  pollingStationService: Pollingstationservice;
  alertMsg: string;
  alertMsgHeading: string;
  selectedStation: PollingStation;
  titlec: {page: any, title: string};

  constructor(private navCtrl: NavController, navParams: NavParams, 
              pollingStationService: Pollingstationservice, private restSvc: RestService) {
  this.navCtrl = navCtrl;
  this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
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
    var station = {
          pollingStationKey: '',
          precinctNumber: '',
          streetAddress: '',
          unitNumber: '',
          roomNumber: '',
          city: '',
          state: '',
          zip: null,
    };

    this.pollingStationService.setStation(station);
    try {
        this.navCtrl.setRoot(FindpollinglocationPage, {
            title: globals.FINDPOLLINGTITLE,
            menupg: this.titlec.page
        });
    } catch (EE) {
        console.log('error in Submitting, exc='+ EE.toString())
    }
}

onAdd(){

    this.pollingStationService.duplicateYesOrNo = false;
    this.pollingStationService.matchingPrecinctAndZipList = [];

    this.restSvc.savePollStationInfo(true)
        .subscribe( (data) => {
            // Expect response created here...
            if (data.status == 201) {
                console.log('successful call:' + data);
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
                return;
            } else if (err.status == 400) {
                errStr = err._body // toString();
            } else {
                errStr = err.toString();
            }
            // console.log(error.stack());
            this.alertMsg = errStr;
            this.alertMsgHeading = 'Error Adding Poll Station';
        }, () => {console.log('add dupe polling station complete')}
                  );
}

    successForward(real:boolean) {
        var subtitle;
        var that = this;
        if (real) {
            subtitle = 'Congratulations you have successfully initiated a new audit! This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.';
        } else {
            subtitle = 'For TESTING PURPOSES, we simulate success here.  You would be told: This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.';


            this.pollingStationService.addPollingStations(this.pollingStationService.getStation());

        }
        this.alertMsg = subtitle;
        this.alertMsgHeading = 'Addition Successful';

        // Send to polling station details page
        try {
            that.navCtrl.setRoot(PollingstationdetailsPage, {
                title: globals.PSDETAILTITLE,
                menupg: this.titlec.page
            });
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }

    }



showStationDetails(item){
    this.selectedStation = item;
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
