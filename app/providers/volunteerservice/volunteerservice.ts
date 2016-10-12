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

  constructor() {
    //this.currentVolunteer = null;
  }
  
  
  
  
      setNewVolunteer(value){
      var that = this;
      this.currentVolunteer = value;
      }

       getNewVolunteer(value){
     return this.currentVolunteer;
      }

      addCurrentVolunteerToList(value){
     
      }

      deleteCurrentVolunteerFromList(value){
     
      }

}

