import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';


@Component({
  templateUrl: 'build/pages/registrationsuccess/registrationsuccess.html',
})
export class RegistrationsuccessPage {

  constructor(private navCtrl: NavController) {

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
