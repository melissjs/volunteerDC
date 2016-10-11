import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../volunteer.ts';

@Component({
  selector: 'pollingstationcomponent',
  templateUrl: 'build/pages/pollingstationcomponent/pollingstationcomponent.html',
  inputs: ['passedStations', 'Volunteer']
})
export class PollingstationComponent {


}
