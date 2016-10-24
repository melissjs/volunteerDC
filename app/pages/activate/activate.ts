import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Logincomponent} from '../logincomponent/logincomponent';
import {RestService} from '../../providers/rest-service/rest-service';

/*
  Generated class for the ActivatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/activate/activate.html',
})
export class ActivatePage {
    key: string;
    stat: number;
    errString: string;
    constructor(private navCtrl: NavController, public params: NavParams, private restSvc: RestService) {
	this.key = this.params.get('key');
	this.stat = 0;
	this.errString = null;
	var that = this;
	console.log('key = ' + this.key);
	that.restSvc.sendActivation(this.key)
          .subscribe( data => {
              console.log('successful call:' + data);
	      if (data.status == 200) {
		  that.stat = 1;
              }
          }, err => {
              console.log('error occurred ' + err.toString());
              if ((err.status == 0) ||
                  (err.status == 404)) {
                  that.stat = 2; // "Unknown Error!";
		  // fake success
              } else {
		  that.stat = 3; // definite error
                  that.errString = err.toString();
              }
          }, () => {console.log('activate complete')});
    }
    onSubmit() {
        try {
            this.navCtrl.setRoot(Logincomponent);
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }
}
