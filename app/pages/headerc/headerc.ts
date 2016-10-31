import { Component , Input } from '@angular/core';
import { NavController } from 'ionic-angular';
// import {MenuPage} from '../../pages/menu/menu';

/*
  Generated class for the Headerc component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'headerc',
    templateUrl: 'build/pages/headerc/headerc.html',
    inputs: [ 'titlec'],
})
export class Headerc {

    @Input() titlec;
    
    // menupg: any;

    constructor(private navCtrl: NavController) {
	// this.menupg = MenuPage;
    }

    onMenu() {
	this.navCtrl.push(this.titlec.page);
    }

}
