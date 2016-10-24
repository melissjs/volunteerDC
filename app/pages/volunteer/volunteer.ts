import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {UnregisteredsigninPage} from '../unregisteredsignin/unregisteredsignin';
import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';

import {RestService} from '../../providers/rest-service/rest-service';


@Component({
  templateUrl: 'build/pages/volunteer/volunteer.html',
})
export class VolunteerPage {

  constructor(private navCtrl: NavController, private restSvc: RestService) {
  this.navCtrl = navCtrl;
  this.restSvc = restSvc;
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

onFindPolling(){
var that = this;
        try {
            
                that.navCtrl.push(FindpollinglocationPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
}

onAddPolling(){
var that = this;
        try {
            
                that.navCtrl.push(AddpollinglocationPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
}



}
