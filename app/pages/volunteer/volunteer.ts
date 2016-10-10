import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {UnregisteredsigninPage} from '../unregisteredsignin/unregisteredsignin';
import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';


@Component({
  templateUrl: 'build/pages/volunteer/volunteer.html',
})
export class VolunteerPage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }

  onRegister(){
        var that = this;
        try {
            
                that.navCtrl.push(UnregisteredsigninPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
  }

}
