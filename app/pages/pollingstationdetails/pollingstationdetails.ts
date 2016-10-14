import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// to nav to
import { ConfirmationPage } from '../confirmation/confirmation';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';
import { Volunteer} from '../../volunteer.ts';
//import { Team } from '../../team.ts';
import { PollingStation } from '../../pollingstation.ts';

import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice.ts';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice.ts';


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

      constructor(private navCtrl: NavController, pollingStationService: Pollingstationservice, volunteerservice: Volunteerservice, private alertCtrl: AlertController ) {
      this.pollingStationService = pollingStationService;
      this.volunteerservice = volunteerservice;
      //this.currentVolunteerHere = null;
      this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();
      this.currentStation = this.pollingStationService.getStation();
      //var passedStations = this.pollingStationService.selectedStation;

      //console.log(pollingStationService.selectedStation.associatedVolunteerList[1].exposeEmail);
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
  }


          onSubmit(){

            //clear shift arrays
            this.volunteerservice.currentVolunteer.shifts.splice(0, this.volunteerservice.currentVolunteer.shifts.length);
            
            //check to see if polling station conflict (needed?)
            
                         

            
            

          // add shift(s) to volunteer object
            if(this.eM){
            this.volunteerservice.setShifts('Early Morning');
          }

          if(this.lM){
            this.volunteerservice.setShifts('Late Morning');
          }

            if(this.eA){
            this.volunteerservice.setShifts('Early Afternoon');
          }

          if(this.lA){
            this.volunteerservice.setShifts('Late Afternoon');
          }

            if(this.eE){
            this.volunteerservice.setShifts('Early Evening');
          }

          if(this.lE){
            this.volunteerservice.setShifts('Late Evening');
            console.log(this.currentVolunteerHere);
          }

           //check for selected station, remove volunteer from old station
           if(this.volunteerservice.currentVolunteer.pollingStation && this.volunteerservice.currentVolunteer.pollingStation!=this.currentStation){
           this.pollingStationService.removeVolunteerFromAssociatedVolunteerList(this.volunteerservice.currentVolunteer, this.volunteerservice.currentVolunteer.pollingStation);   
           console.log(this.volunteerservice.currentVolunteer.pollingStation.associatedVolunteerList);
           }

           //add polling station to volunteer object
           this.volunteerservice.setPollingStationForVolunteer(this.currentStation); 
           //console.log(this.currentVolunteerHere);


          // add volunteer to associatedVolunteerList in station object
         if(this.pollingStationService.isCurrentVolunteerInArray(this.currentVolunteerHere)==false){
          this.pollingStationService.addVolunteerToAssociatedVolunteerList(this.currentVolunteerHere);
          } 



          // ###### left to do: push station and volunteer obejcts to appropriate arrays??



            // alert
              var that = this;
          try{
            if ((this.eM == true) || (this.lM) || (this.eA) || (this.lA) || (this.eE) || (this.lE) ){
                  let alert = this.alertCtrl.create({
                    //title: 'Please confirm',
                    subTitle: 'I have read this statement and confirm that I understand the terms for participating in this audit.',
                    buttons: ['CONFIRM'] 
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

