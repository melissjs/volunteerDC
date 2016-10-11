import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';




@Component({
  selector: 'pollingstationdetailscomponent',
  templateUrl: 'build/pages/pollingstationdetailscomponent/pollingstationdetailscomponent.html',
  inputs: ['passedStations', /*'Volunteer'*/]
})
export class Pollingstationdetailscomponent {

  constructor(private navCtrl: NavController) {

  }

}


