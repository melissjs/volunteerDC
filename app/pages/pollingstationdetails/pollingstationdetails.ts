import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// to nav to
import { ConfirmationPage } from '../confirmation/confirmation';
import { UnregisteredsigninPage } from '../unregisteredsignin/unregisteredsignin';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';
import { Volunteer} from '../../volunteer';
//import { Team } from '../../team.ts';
import { PollingStation } from '../../pollingstation';

import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';

import * as globals from '../../globals';


@Component({
    templateUrl: 'build/pages/pollingstationdetails/pollingstationdetails.html',
    inputs: ['pollingstation', 'volunteer'],
    directives: [PollingstationComponent],
    //providers: [Pollingstationservice]
})
export class PollingstationdetailsPage {
    currentVolunteerHere: Volunteer; 
    //currentTeam: Team;
    stations: PollingStation[];
    pollingStationService: Pollingstationservice;
    volunteerservice: Volunteerservice;
    currentStation: PollingStation;

    eM: boolean = false;
    lM: boolean = false;
    eA: boolean = false;
    lA: boolean = false;
    eE: boolean = false;
    lE: boolean = false;

    earlyM: boolean = false;
    lateM: boolean = false;
    earlyA: boolean = false;
    lateA: boolean = false;
    earlyE: boolean = false;
    lateE: boolean = false;

    EARLY_MORNING: string = globals.EARLY_MORNING;
    LATE_MORNING: string = globals.LATE_MORNING;
    EARLY_AFTERNOON: string = globals.EARLY_AFTERNOON;
    LATE_AFTERNOON: string = globals.LATE_AFTERNOON;
    EARLY_EVENING: string = globals.EARLY_EVENING;
    LATE_EVENING: string = globals.LATE_EVENING;


    shiftSelected: boolean = false;

    constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice, volunteerservice: Volunteerservice, private alertCtrl: AlertController ) {
        this.pollingStationService = pollingStationService;
        this.volunteerservice = volunteerservice;
        //this.currentVolunteerHere = null;
        this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();
        this.currentStation = this.pollingStationService.getStation();
        //var passedStations = this.pollingStationService.selectedStation;

        //console.log(pollingStationService.selectedStation.associatedVolunteerList[1].exposeEmail);
        
        //ATTEMP TO FIX PROBLEM
if (!this.currentVolunteerHere){

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
            associatedPollingStationKey:null, 
            totalRecords:null,
            totalVoteRecords:null,
            totalAnomalyRecords: null,
            totalAmendmentRecords: null,
        }
        volunteerservice.setNewVolunteer(this.currentVolunteerHere);

}



        this.setShifts();
        
    }


    setShifts() {
        if (this.currentVolunteerHere.associatedPollingStationKey == 
            this.currentStation.pollingStationKey) {
            if (this.currentVolunteerHere.shifts.includes(globals.EARLY_MORNING)) {
                this.eM = true;
                this.earlyM = true;
                this.shiftSelected = true;
            }
            if (this.currentVolunteerHere.shifts.includes(globals.LATE_MORNING)) {
                this.lM = true;
                this.lateM = true;
                this.shiftSelected = true;
            }
            if (this.currentVolunteerHere.shifts.includes(globals.EARLY_AFTERNOON)) {
                this.eA = true;
                this.earlyA = true;
                this.shiftSelected = true;
            }
            if (this.currentVolunteerHere.shifts.includes(globals.LATE_AFTERNOON)) {
                this.lA = true;
                this.lateA = true;
                this.shiftSelected = true;
            }
            if (this.currentVolunteerHere.shifts.includes(globals.EARLY_EVENING)) {
                this.eE = true;
                this.earlyE = true;
                this.shiftSelected = true;
            }
            if (this.currentVolunteerHere.shifts.includes(globals.LATE_EVENING)) {
                this.lE = true;
                this.lateE = true;
                this.shiftSelected = true;
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
        // console.log(this.volunteerservice.getVolunteersByStation(this.currentStation));
    }

    onRegister(){
        var that = this;
      try {that.navCtrl.setRoot(UnregisteredsigninPage, {});
            

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        } 
    }

    onSubmit(){

        //clear shifts
        console.log(this.volunteerservice.printVolunteerKeysFromList());
        
        // this.volunteerservice.currentVolunteer.shifts.splice(0, this.volunteerservice.currentVolunteer.shifts.length);
        this.volunteerservice.clearShifts();
        
        //check to see if polling station conflict (needed?)

        var shiftNowSelected = false;

        // add shift(s) to volunteer object
        if(this.eM){
            this.volunteerservice.setShifts(globals.EARLY_MORNING);
            shiftNowSelected = true;
        }

        if(this.lM){
            this.volunteerservice.setShifts(globals.LATE_MORNING);
            shiftNowSelected = true;
        }

        if(this.eA){
            this.volunteerservice.setShifts(globals.EARLY_AFTERNOON);
            shiftNowSelected = true;
        }

        if(this.lA){
            this.volunteerservice.setShifts(globals.LATE_AFTERNOON);
            shiftNowSelected = true;
        }

        if(this.eE){
            this.volunteerservice.setShifts(globals.EARLY_EVENING);
            shiftNowSelected = true;
        }

        if(this.lE){
            this.volunteerservice.setShifts(globals.LATE_EVENING);
            shiftNowSelected = true;
            console.log(this.currentVolunteerHere);
        }

        //check for selected station, remove volunteer from old station
        if ((shiftNowSelected) ||
            (this.shiftSelected && !shiftNowSelected)) { // Something changed (all cleared)
            
            if(this.currentVolunteerHere.associatedPollingStationKey && this.currentVolunteerHere.associatedPollingStationKey!=this.currentStation.pollingStationKey) {
                this.pollingStationService.removeVolunteerFromAssociatedVolunteerList(this.currentVolunteerHere, this.currentVolunteerHere.associatedPollingStationKey);   
                //console.log(this.currentVolunteerHere.pollingStation.associatedVolunteerList);
            }

            //add polling station to volunteer object
            this.volunteerservice.setPollingStationForVolunteer(this.currentStation); 
            console.log(this.currentVolunteerHere);

            // add volunteer to associatedVolunteerList in station object
            if(this.pollingStationService.isCurrentVolunteerInArray(this.currentVolunteerHere)==false){
                this.pollingStationService.addVolunteerToAssociatedVolunteerList(this.currentVolunteerHere);
            }
            console.log(this.currentStation.associatedVolunteerKeyList);

            // ###### left to do: push station and volunteer obejcts to appropriate arrays??
        }


        // alert
        var that = this;
        try {
            if ((shiftNowSelected) ||
                (this.shiftSelected && !shiftNowSelected)) { // Something changed (all cleared)

                // ((this.eM == true) || (this.lM) || (this.eA) || (this.lA) || (this.eE) || (this.lE) ){
                let alert = this.alertCtrl.create({
                    title: 'Independently Validate Location Address',
                    subTitle: 'Please keep in mind anyone can enter a polling location address and we cannot check the validity of every single one; make sure to confirm this polling location is legitimate for yourself.',
                    buttons: ['OK'] 
                });
                alert.present();
            } else {
                that.navCtrl.push(ConfirmationPage, {
                });
            }

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
