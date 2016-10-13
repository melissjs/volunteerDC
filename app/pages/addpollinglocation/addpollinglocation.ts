import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//to nav to
import {PollingstationdetailsPage} from '../pollingstationdetails/pollingstationdetails';

// interfaces
import { PollingStation } from '../../pollingstation.ts';
import { Volunteer} from '../../volunteer.ts';

// services
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice.ts';


@Component({
  templateUrl: 'build/pages/addpollinglocation/addpollinglocation.html',
  inputs: ['pollingstation', 'volunteer'],
})
export class AddpollinglocationPage {
newPollingStation: PollingStation;
pollingStationService: Pollingstationservice;
stations: PollingStation[];
precinctNumber: string;
streetAddress: string;
unitNumber: string;
roomNumber: string;
city: string;
state: string;
zip: number;
associatedVolunteerList: Volunteer[];
totalRegisteredVolunteers: number;
totalNeededVolunteers: number;
totalRemainingShiftsToFill: number;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, pollingStationService: Pollingstationservice) {
  this.navCtrl = navCtrl;
  this.pollingStationService = pollingStationService;
  this.stations = pollingStationService.getStations();
  this.precinctNumber = null;
  this.streetAddress = null;
  this.unitNumber = null;
  this.roomNumber = null;
  this.city = null;
  this.zip = null;
  this.associatedVolunteerList = [];
  this.totalRegisteredVolunteers = null;
  this.totalNeededVolunteers = null;
  this.totalRemainingShiftsToFill = null;
  }





      onSubmit() {

        // instantiate new station
        this.newPollingStation = {
          precinctNumber: this.precinctNumber,
          streetAddress: this.streetAddress,
          unitNumber: this.unitNumber,
          roomNumber: this.roomNumber,
          city: this.city,
          state: this.state,
          zip: this.zip,
          associatedVolunteerList: [],
          totalRegisteredVolunteers: null,
          totalNeededVolunteers: null,
          totalRemainingShiftsToFill: null
        }

        console.log(this.newPollingStation);


      // add new station to list
      this.stations.push(this.newPollingStation);
      console.log(this.stations);

      // set station for details pages
      this.pollingStationService.setStation(this.newPollingStation);






        // show alert
            var that = this;
            if (this !== null){
            let alert = this.alertCtrl.create({
                        title: 'Addition Successful',
                        subTitle: 'Congratulations you have successfully initiated a new audit! This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.',
                        buttons: ['OK'] 
                    });
                    alert.present();
            }


            try {
                that.navCtrl.push(PollingstationdetailsPage, {});
                } catch (EE) {
                console.log('error in Submitting, exc='+ EE.toString())
                }

        }

onChangePrecinctNumber(value){
  this.precinctNumber = value;
}

onChangeStreetAddress(value){
  this.streetAddress = value;
}

onChangeUnitNumber(value){
  this.unitNumber = value;
}

onChangeRoomNumber(value){
  this.roomNumber = value;
}

onChangeCity(value){
  this.city = value;
}

onChangeState(value){
  this.state = value;
}

onChangeZip(value){
  this.zip = value;
}

}
