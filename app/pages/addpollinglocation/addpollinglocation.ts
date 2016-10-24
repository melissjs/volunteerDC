import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//to nav to
import {PollingstationdetailsPage} from '../pollingstationdetails/pollingstationdetails';
import {DuplicatepollingstationPage} from '../duplicatepollingstation/duplicatepollingstation';

// interfaces
import { PollingStation } from '../../pollingstation';
import { Volunteer} from '../../volunteer';

// services
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';

// forms
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { UnregisteredsigninPage } from '../unregisteredsignin/unregisteredsignin';

import {RestService} from '../../providers/rest-service/rest-service';


@Component({
  templateUrl: 'build/pages/addpollinglocation/addpollinglocation.html',
  inputs: ['pollingstation', 'volunteer'],
})
export class AddpollinglocationPage {
pollingStationKey: string;
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
currentVolunteerHere: Volunteer;
volunteerservice: Volunteerservice;
addPollingLocationForm: FormGroup;
loggedIn: boolean;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, pollingStationService: Pollingstationservice, volunteerservice: Volunteerservice, public fb: FormBuilder, private restSvc: RestService) {
  this.navCtrl = navCtrl;
  this.restSvc = restSvc;
  this.pollingStationService = pollingStationService;
  this.stations = pollingStationService.getStations();
  this.pollingStationKey = this.pollingStationService.generatePollingStationKey();
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
  this.volunteerservice = volunteerservice;
  this.loggedIn = false;

   if(this.restSvc.getLoggedIn()){
            this.loggedIn = true;
        }

        this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();



/* old way

   if(volunteerservice.currentVolunteer!==null){
  this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();
   }else{

        this.currentVolunteerHere = {
            volunteerKey: null,
            fullName: null,
            emailAddress: null,
            exposeEmail: false,
            phoneNumber: null,
            age:null,
            sex: null,
            partyAffiliation: null,
            shifts:'', 
            passcode: null,
            associatedPollingStationKey: null, 
            totalRecords:null,
            totalVoteRecords:null,
            totalAnomalyRecords: null,
            totalAmendmentRecords: null,
        }
        volunteerservice.setNewVolunteer(this.currentVolunteerHere);
        console.log(this.currentVolunteerHere); 

} */

// instantiate blank station
this.newPollingStation = {
          pollingStationKey: this.pollingStationKey,
          precinctNumber: '',
          streetAddress: '',
          unitNumber: '',
          roomNumber: '',
          city: '',
          state: '',
          zip: null,
}



   
        //form stuff
        var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
        var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
        var regExAge: string = '[1]*[0-9]?[0-9]';
        var regExLettersOnly: string = '[a-ZA-Z]+';
        var regExNumbersOnly: string = '[0-9]*';
        var regExZip: string = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';

        this.addPollingLocationForm = fb.group({  
            'enterPrecinctNumber': ['', Validators.compose([Validators.required])],
            'enterStreetAddress': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'enterUnitNumber': [''],
            'enterRoomNumber': [''],
            'enterCity': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'enterState': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'enterZip': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(regExZip)])],
            

        });

  // constructor end
  }



onChangePrecinctNumber(value){
  //this.precinctNumber = value;
  //console.log('from function: ' + this.precinctNumber);
}

onChangeStreetAddress(value){
 // this.streetAddress = value;
}

onChangeUnitNumber(value){
  //this.unitNumber = value;
}

onChangeRoomNumber(value){
  //this.roomNumber = value;
}

onChangeCity(value){
 // this.city = value;
}

onChangeState(value){
 // this.state = value;
}

onChangeZip(value){
  //this.zip = value;
}

    onRegister(){
        var that = this;
      try {that.navCtrl.setRoot(UnregisteredsigninPage, {});
            

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        } 
    }


// Compare precint number and zip for navigating to duplicate station pages
onComparePrecintAndZip(){
  if(this.newPollingStation.precinctNumber && this.newPollingStation.zip){
    if(this.pollingStationService.duplicateStationSearch(this.newPollingStation.precinctNumber, this.newPollingStation.zip)){
     // call alert popup
		return true
  }
  } else {
    return false
  }
}














      onSubmit(value: any): void {



        // instantiate new station
//console.log('from value: ' + value.enterPrecinctNumber);

        this.newPollingStation = {
          pollingStationKey: this.pollingStationKey,
          precinctNumber: value.enterPrecinctNumber,
          streetAddress: value.enterStreetAddress,
          unitNumber: value.enterUnitNumber,
          roomNumber: value.enterRoomNumber,
          city: value.enterCity,
          state: value.enterState,
          zip: value.enterZip,
        }


     // set station for details pages (MUST NOT ADD TO LIST IF CONFIRMED DUPLICATE)
      this.pollingStationService.setStation(this.newPollingStation);

/*
      //reset form not working so manual reset
      //this.addPollingLocationForm.reset();
        this.addPollingLocationForm = this.fb.group({  
            'enterPrecinctNumber': [''],
            'enterStreetAddress': [''],
            'enterUnitNumber': [''],
            'enterRoomNumber': [''],
            'enterCity': [''],
            'enterState': [''],
            'enterZip': [''],
        });*/

        if(this.onComparePrecintAndZip()){
          	try {
		    this.navCtrl.push(DuplicatepollingstationPage, {});
		} catch (EE) {
		    console.log('error in Submitting, exc='+ EE.toString())
		}

        } else {

        //console.log('new one: ' + this.newPollingStation.precinctNumber);


      // add new station to list
      this.stations.push(this.newPollingStation);
      
      //console.log(this.stations);



        // show alert
            var that = this; 
            if (this !== null){
            let alert = this.alertCtrl.create({
                        title: 'Addition Successful',
                        subTitle: 'Congratulations you have successfully initiated a new audit! This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.',
		buttons: [ 'OK' ]
                    });
                    alert.present();
		try {
		    that.navCtrl.setRoot(PollingstationdetailsPage, {});
		} catch (EE) {
		    console.log('error in Submitting, exc='+ EE.toString())
		}

            }


         }
      }

}
