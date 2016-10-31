import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';

/*
  Generated class for the PromotePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/promote/promote.html',
  directives: [Headerc],
})
export class PromotePage {
    titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, navParams: NavParams) {

      this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };

    }
}
