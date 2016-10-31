import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';
import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';

import * as globals from '../../globals';

@Component({
  templateUrl: 'build/pages/registrationsuccess/registrationsuccess.html',
  directives: [Headerc],
})
export class RegistrationsuccessPage {
    titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, navParams: NavParams) {

      this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };

    }

    onFindPolling(){
        var that = this;
        try {
                that.navCtrl.push(FindpollinglocationPage, {
                    title: globals.FINDPOLLINGTITLE,
                    menupg: that.titlec.page
                });
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
}

onAddPolling(){
var that = this;
        try {
            
                that.navCtrl.push(AddpollinglocationPage, {
                    title: globals.ADDPOLLINGTITLE,
                    menupg: that.titlec.page
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
}

}
