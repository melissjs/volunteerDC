import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ActivatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/activate/activate.html',
})
export class ActivatePage {
  key: number;
  constructor(private navCtrl: NavController, public params: NavParams) {
      this.key = this.params.get('key');
      console.log('key = ' + this.key);
  }
}
