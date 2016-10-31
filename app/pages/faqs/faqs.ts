import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';

/*
  Generated class for the FaqsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/faqs/faqs.html',
  directives: [Headerc],
})
export class FaqsPage {
    titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, navParams: NavParams) {

      this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };

    }
}
