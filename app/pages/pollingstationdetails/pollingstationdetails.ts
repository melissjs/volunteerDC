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

import {RestService} from '../../providers/rest-service/rest-service';


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
    loggedIn: boolean;

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

    volunteerCount: number;
    shiftsToFill: number;
    shiftsFilled: number;

    constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice, volunteerservice: Volunteerservice, private alertCtrl: AlertController, private restSvc: RestService ) {
        this.pollingStationService = pollingStationService;
        this.volunteerservice = volunteerservice;
        this.restSvc = restSvc;
        this.loggedIn = false;
        this.restSvc.checkLoggedIn(this.setLoginTrue, this.setLoginFalse, this);
        this.volunteerCount = 0;
        this.shiftsToFill = 0;
        this.shiftsFilled = 0;

        //this.currentVolunteerHere = null;
        this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();
        this.currentStation = this.pollingStationService.getStation();

        this.volunteerservice.generateStationStats(this.currentStation.pollingStationKey);
        this.volunteerCount = this.volunteerservice.getVolunteerCount();
        this.shiftsToFill = this.volunteerservice.getShiftsToFill();
        this.shiftsFilled = this.volunteerservice.getShiftsFilled();


        
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
            associatedPollingStationKey:null
        }
        volunteerservice.setNewVolunteer(this.currentVolunteerHere);

}



        this.setShifts();
        
    } // end const

    setLoginTrue(that) {
        that.loggedIn = true;
    }

    setLoginFalse(that) {
        that.loggedIn = false;
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
        console.log('signature selected:' + earlyM + ' heyyyy ' + this.loggedIn);
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
        //console.log(this.volunteerservice.printVolunteerKeysFromList());
        
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
         
            //add polling station to volunteer object
            this.volunteerservice.setPollingStationForVolunteer(this.currentStation); 
            console.log(this.currentVolunteerHere);

          
        }


        // alert
        var that = this;
        try {
            if ((shiftNowSelected) ||
                (this.shiftSelected && !shiftNowSelected)) { // Something changed (all cleared)

                this.restSvc.saveVolunteerInfo()
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
                        if (err.status == 400) {
                            errStr = err._body // toString();
                        } else {
                            errStr = err.toString();
                        }
                        // console.log(error.stack());
                        let alert = that.alertCtrl.create({
                            title: 'Error Saving Polling Station Details',
                            subTitle: errStr,
                            buttons: [{
                                text: 'OK',
                                handler: () => {
                                    alert.dismiss();
                                }
                            }]
                        }
                                                         );
                        //timeout the error to let other modals finish dismissing.
                        setTimeout(()=>{
                            alert.present();
                        },500);
                    }, () => {console.log('save polling details complete')}
                              );
            } 

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

    successForward(real:boolean) {

        // ((this.eM == true) || (this.lM) || (this.eA) || (this.lA) || (this.eE) || (this.lE) ){
        let alert = this.alertCtrl.create({
            title: 'Independently Validate Location Address',
            subTitle: 'Please keep in mind anyone can enter a polling location address and we cannot check the validity of every single one; make sure to confirm this polling location is legitimate for yourself.',
            buttons: ['OK'] 
        });
        alert.present();
        this.navCtrl.push(ConfirmationPage, {
        });
    }

}
