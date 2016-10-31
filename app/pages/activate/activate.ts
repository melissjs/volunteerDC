import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../loginpage/loginpage';
import {RestService} from '../../providers/rest-service/rest-service';
import { Headerc} from '../headerc/headerc';

import * as globals from '../../globals';

/*
  Generated class for the ActivatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/activate/activate.html',
  directives: [Headerc],
})
export class ActivatePage {
    key: string;
    stat: number;
    errString: string;
    titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, public params: NavParams, private restSvc: RestService) {
        this.key = this.params.get('key');
        this.stat = 0;
        this.errString = null;
        this.titlec = { page: params.get("menupg"), title: "Activate" };
        var that = this;
        console.log('key = ' + this.key);
        that.restSvc.sendActivation(this.key)
          .subscribe( data => {
              console.log('successful call:' + data);
              if (data.status == 200) {
                  that.stat = 1;
              } else {
                  // ?? shouldn't happen ??
                  console.log('UNKNOWN STATUS:' + data);
              }
          }, err => {
              console.log('error occurred ' + err.toString());
              if ((err.status == 0) ||
                  (err.status == 404)) {
                  that.stat = 2; // "Unknown Error!";
                  // fake success
              } else if (err.status == 500) {
                  that.stat = 3; // definite error
                  that.errString = err._body // toString();
              } else {
                  that.stat = 3; // definite error
                  that.errString = err.toString() + err._body;
              }
          }, () => {console.log('activate complete')});
    }
    onSubmit() {
        try {
            this.navCtrl.setRoot(LoginPage, {
                title: globals.LOGINPAGETITLE,
                menupg: this.titlec.page
            });
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }
}
