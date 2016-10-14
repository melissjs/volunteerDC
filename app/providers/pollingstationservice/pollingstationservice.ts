import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PollingStation } from '../../pollingstation.ts';
//import { Volunteer} from '../../volunteer.ts';
//import { Team } from '../../team.ts';


// datalist
import { STATIONS } from '../../stationlist.ts';

// pipes
//import { Searchpipe } from '../../pipes/searchpipe.ts';


@Injectable()
export class Pollingstationservice {
selectedStation: PollingStation;
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
                  } else {
                    return false;
                  }
              }
  }

  removeCurrentVolunteerFromArray(passedVolunteer){
      for (var i = 0; i < this.selectedStation.associatedVolunteerList.length; i++) {
                if (this.selectedStation.associatedVolunteerList[i].emailAddress == passedVolunteer.emailAdress){
                this.selectedStation.associatedVolunteerList.splice(i, 1);
                }
              }
  }


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
