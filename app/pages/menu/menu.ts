import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// actual pages called from menu
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {VolunteerPage} from '../volunteer/volunteer';
import {DonatePage} from '../donate/donate';
import {ParticipatePage} from '../participate/participate';
import {EducatePage} from '../educate/educate';
import {AuditchecklistPage} from '../auditchecklist/auditchecklist';
import {PromotePage} from '../promote/promote';
import {ContactPage} from '../contact/contact';
import {AccountsettingsPage} from '../accountsettings/accountsettings';

import {RestService} from '../../providers/rest-service/rest-service';

/*
  Generated class for the MenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {

    pages: Array<{title: string, component: any, loggedin: boolean}>;
    restSvc: RestService;

    constructor(private navCtrl: NavController, restSvc: RestService) {

	this.pages = [
	    { title: 'Home', component: HomePage, loggedin: false },
	    { title: 'About', component: AboutPage , loggedin: false },
	    { title: 'Volunteer', component: VolunteerPage , loggedin: false },
	    { title: 'Donate', component: DonatePage , loggedin: false },
	    { title: 'Participate', component: ParticipatePage , loggedin: false },
	    { title: 'Audit Training', component: EducatePage , loggedin: false },
	    { title: 'Audit Checklist', component: AuditchecklistPage , loggedin: false },
	    { title: 'Promote', component: PromotePage , loggedin: false },
	    { title: 'Contact Us', component: ContactPage , loggedin: false },
	    { title: 'Account', component: AccountsettingsPage , loggedin: true },
	];
	this.restSvc = restSvc;

    }

    openPage(page) {
	// navigate to the new page if it is not the current page
	this.navCtrl.push(page.component, {
	    title: page.title,
	    menupg: MenuPage
	});
    }

}
