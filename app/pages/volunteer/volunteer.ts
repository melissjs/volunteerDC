import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {UnregisteredsigninPage} from '../unregisteredsignin/unregisteredsignin';
import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';

import {RestService} from '../../providers/rest-service/rest-service';
import { Headerc} from '../headerc/headerc';

import * as globals from '../../globals';

@Component({
    templateUrl: 'build/pages/volunteer/volunteer.html',
    directives: [Headerc],
})
export class VolunteerPage {
    titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, navParams: NavParams, private restSvc: RestService) {

	this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
	this.navCtrl = navCtrl;
	this.restSvc = restSvc;
    }

    onRegister(){
        var that = this;
        try {
            that.navCtrl.push(UnregisteredsigninPage, {
		title: globals.UNREGPAGETITLE,
		menupg: that.titlec.page
	    });
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
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
