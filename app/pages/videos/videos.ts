import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';

@Component({
  templateUrl: 'build/pages/videos/videos.html',
  directives: [Headerc],
})
export class VideosPage {
    titlec: {page: any, title: string};

    constructor(private navCtrl: NavController, navParams: NavParams) {

      this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };

    }
}
