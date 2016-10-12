import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer.ts';
import { Team } from '../../team.ts';

// station json array
import { STATIONS } from '../../stationlist.ts';


@Injectable()
export class Volunteerservice {

  constructor(private http: Http) {}

}

