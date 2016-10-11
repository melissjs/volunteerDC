import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PollingStation } from '../../pollingstation.ts';
//import { Volunteer} from '../../volunteer.ts';
//import { Team } from '../../team.ts';

import { STATIONS } from '../../stationlist.ts';


@Injectable()
export class Pollingstationservice {
selectedStation: PollingStation;

constructor(){}

  getStations() { return STATIONS;  }

  setStation(passedValue){
    var that = this;
    this.selectedStation = passedValue;
    //return this.selectedStation;
  }

printSelectedStation(){
  console.log('from service' + this.selectedStation.streetAddress)
}


//printSelectedStations(){
  //console.log('from service hello')
//}


}
