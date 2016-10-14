import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer.ts';
import { Team } from '../../team.ts';

// station json array
import { VOLUNTEERS } from '../../volunteerlist.ts';


@Injectable()
export class Volunteerservice {
currentVolunteer: Volunteer;
exposedYesOrNo: string;

  constructor() {
    this.currentVolunteer = null;
  }
  
  
      getVolunteers() { return VOLUNTEERS;  }
  
      setNewVolunteer(value){
      var that = this;
      this.currentVolunteer = value;
      }

       getNewVolunteer(){
     return this.currentVolunteer;
      }

      setPollingStationForVolunteer(value){
      this.currentVolunteer.pollingStation = value;
      }

      hasPollingStation(passedVolunteer){
        if(this.currentVolunteer.pollingStation != null)
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

    

      /*checkCurrentVolunteerExists(){
      if(this.currentVolunteer !== null){
        return true;
      }
      }*/

}

