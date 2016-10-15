import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PollingStation } from '../../pollingstation';
import { Volunteer} from '../../volunteer';
//import { Team } from '../../team.ts';


// datalist
import { STATIONS } from '../../stationlist';

// pipes
//import { Searchpipe } from '../../pipes/searchpipe.ts';


@Injectable()
export class Pollingstationservice {
selectedStation: PollingStation;
oldStation: PollingStation;
stationListInMemory: PollingStation[];
//searchpipe: Searchpipe;

constructor(){
  this.stationListInMemory = this.getStations();
}

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

   generatePollingStationKey(){
    return 'ps'+(this.stationListInMemory.length+1);
    }

         getPollingStationbyKey(passedKey){ 
         for (var i = 0; i < this.stationListInMemory.length; i++){
           if (this.stationListInMemory[i].pollingStationKey == passedKey){
             return this.stationListInMemory[i]
           }
         }
          return null;
       }




  isCurrentVolunteerInArray(passedVolunteer){

              for (var i = 0; i < this.selectedStation.associatedVolunteerKeyList.length; i++) {
                          if (this.selectedStation.associatedVolunteerKeyList[i] == passedVolunteer.volunteerKey){
                            console.log(this.selectedStation.associatedVolunteerKeyList[i] + passedVolunteer.volunteerKey);

                            return true;
                            } 
                }
                   return false; 
  } 

  removeVolunteerFromAssociatedVolunteerList(passedVolunteer: Volunteer, stationKey: string){
                    this.oldStation = this.getPollingStationbyKey(stationKey);
                    for (var i = 0; i < this.oldStation.associatedVolunteerKeyList.length; i++) {
                              if (this.oldStation.associatedVolunteerKeyList[i] == passedVolunteer.volunteerKey){
                              this.oldStation.associatedVolunteerKeyList.splice(i, 1);
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
      this.selectedStation.associatedVolunteerKeyList.push(passedVolunteer.volunteerKey);
    //return this.selectedStation;
  }

printSelectedStation(){
  console.log('from service' + this.selectedStation.streetAddress)
}


//printSelectedStations(){
  //console.log('from service hello')
//}


}
