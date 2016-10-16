import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';

// station json array
import { VOLUNTEERS } from '../../volunteerlist';

//other service
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';



@Injectable()
export class Volunteerservice {
currentVolunteer: Volunteer;
exposedYesOrNo: string;
oldStation: PollingStation;
pollingstationservice: Pollingstationservice;
volunteerListInMemory: Volunteer[];
volunteersByStation: Volunteer[];
buildString: string;
notRegistered: string;
associatedVolunteerArray: Volunteer[];
tempVolunteer: Volunteer;

  constructor(pollingstationservice: Pollingstationservice) {
    this.currentVolunteer = null;
    this.pollingstationservice = pollingstationservice;
    this.volunteerListInMemory = VOLUNTEERS;
    this.notRegistered = "None";
    this.associatedVolunteerArray = [];
  }
  
  
      getVolunteers() { return this.volunteerListInMemory;  }

      generateVolunteerKey(){
        return 'v'+(this.volunteerListInMemory.length+1);
      }
  
      setNewVolunteer(value){
      var that = this;
      this.currentVolunteer = value;
      }

      getNewVolunteer(){
     return this.currentVolunteer;
      }

      setPollingStationForVolunteer(value){
      this.currentVolunteer.associatedPollingStationKey = value.pollingStationKey;
      }

      hasPollingStation(passedVolunteer){
        if(this.currentVolunteer.associatedPollingStationKey != null)
        return true;
      }

      setShifts(passedString){
        //this.currentVolunteer.shifts = passedString;
        
        this.currentVolunteer.shifts.push(passedString);
      }




        printShifts(passedVolunteer){
         if(this.currentVolunteer.shifts[0]){
          this.buildString = this.currentVolunteer.shifts[0];

          for (var i=1; i < this.currentVolunteer.shifts.length; i++){
          this.buildString = this.buildString + ", " + this.currentVolunteer.shifts[i];
          }
          return this.buildString;
        } else {

          console.log(this.notRegistered);
          return this.notRegistered;
        }
        
      }
 

      addCurrentVolunteerToList(value){
     
      }

      deleteCurrentVolunteerFromList(value){
     
      }

      isEmailExposed(passedVolunteer){
      this.currentVolunteer = passedVolunteer;
      if(this.currentVolunteer.exposeEmail == true){
      this.exposedYesOrNo = "Yes";
      }

      if(this.currentVolunteer.exposeEmail == false){
      this.exposedYesOrNo = "No";
      }
      return this.exposedYesOrNo;
      } 

         getVolunteerbyKey(passedKey){ 
         for (var i = 0; i < this.volunteerListInMemory.length; i++){
           if (this.volunteerListInMemory[i].volunteerKey == passedKey){
             return this.volunteerListInMemory[i]
           }
         }
          return null;
       }
    
       getVolunteersByStation(selectedStationPassed: PollingStation){
         this.volunteersByStation = [];
         for (var i = 0; i < selectedStationPassed.associatedVolunteerKeyList.length; i++){
           this.volunteersByStation.push(this.getVolunteerbyKey(selectedStationPassed.associatedVolunteerKeyList[i]))
        }
        return this.volunteersByStation;
      }


      getVolunteerArrayByKeyList(passedKeyList){
        for ( var i=0; i < passedKeyList.length; i++){
          this.tempVolunteer = this.getVolunteerbyKey(passedKeyList[i]);
          this.associatedVolunteerArray.push(this.tempVolunteer);
        }
        return this.associatedVolunteerArray;
      }

// begin shifts


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

}

