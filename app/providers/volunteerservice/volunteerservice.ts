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

  constructor(pollingstationservice: Pollingstationservice) {
    this.currentVolunteer = null;
    this.pollingstationservice = pollingstationservice;
    this.volunteerListInMemory = VOLUNTEERS;
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



}

