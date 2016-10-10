import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';


@Component({
  templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
})
export class UnregisteredsigninPage {
enterSex: string;
enterParty: string;
enterShift: string;


  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  this.enterSex = null;
  this.enterParty = null;
  this.enterShift = null;
  }

    onSubmit() {
        var that = this;
        try {
            
                that.navCtrl.push(FindpollinglocationPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

            onChangeSex(value){
        this.enterSex = value;
   }

           onChangeParty(value){
        this.enterParty = value;
   }

}
