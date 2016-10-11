import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import { PollingStation } from '../../pollingstation.ts';
//import { Volunteer} from '../../volunteer.ts';
//import { Team } from '../../team.ts';

import { STATIONS } from '../../stationlist.ts';


@Injectable()
export class Pollingstationservice {
  getStations() { return STATIONS;  }
}


/*@Injectable()
export class Pollingstationservice {
  passedStation: PollingStation;

  constructor(private http: Http, pollingStation: PollingStation) {}

  showStationDetails(choicePassed){
    this.passedStation = choicePassed;
  
  }

}*/

