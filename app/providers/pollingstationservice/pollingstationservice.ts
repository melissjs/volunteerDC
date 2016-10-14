import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PollingStation } from '../../pollingstation.ts';
import { Volunteer} from '../../volunteer.ts';
//import { Team } from '../../team.ts';


// datalist
import { STATIONS } from '../../stationlist.ts';

// pipes
//import { Searchpipe } from '../../pipes/searchpipe.ts';


@Injectable()
export class Pollingstationservice {
selectedStation: PollingStation;
oldStation: PollingStation;
//searchpipe: Searchpipe;

constructor(){}

  getStations() { return STATIONS;  }

  setStation(passedValue){
    var that = this;
    this.selectedStation = passedValue;
    //return this.selectedStation;
  }

    getStation(){
    var that = this;
    return this.selectedStation;
    //return this.selectedStation;
  }


  isCurrentVolunteerInArray(passedVolunteer){
              for (var i = 0; i < this.selectedStation.associatedVolunteerList.length; i++) {
                          if (this.selectedStation.associatedVolunteerList[i].emailAddress == passedVolunteer.emailAddress){
                            console.log(this.selectedStation.associatedVolunteerList[i].emailAddress + passedVolunteer.emailAddress);
                            return true;
                            } 
                }
                   return false; 
  } 

  removeVolunteerFromAssociatedVolunteerList(passedVolunteer: Volunteer, passedStation: PollingStation){
      this.oldStation = passedStation;

      for (var i = 0; i < this.oldStation.associatedVolunteerList.length; i++) {
                if (this.oldStation.associatedVolunteerList[i].emailAddress == passedVolunteer.emailAddress){
                this.oldStation.associatedVolunteerList.splice(i, 1);
                }
              }
  }

  /*  removeVolunteerFromOldStationAssociatedVolunteerList(passedVolunteer, oldStation){
      for (var i = 0; i < this.oldStation.associatedVolunteerList.length; i++) {
                if (this.oldStation.associatedVolunteerList[i].emailAddress == passedVolunteer.emailAdress){
                this.oldStation.associatedVolunteerList.splice(i, 1);
                }
              }
  }*/


      addVolunteerToAssociatedVolunteerList(passedVolunteer){
      this.selectedStation.associatedVolunteerList.push(passedVolunteer);
    //return this.selectedStation;
  }

printSelectedStation(){
  console.log('from service' + this.selectedStation.streetAddress)
}


//printSelectedStations(){
  //console.log('from service hello')
//}


}
