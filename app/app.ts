import {enableProdMode} from '@angular/core';

import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {StatusBar} from 'ionic-native';

// actual pages called from menu
import {AboutPage} from './pages/about/about';
import {VolunteerPage} from './pages/volunteer/volunteer';
import {DonatePage} from './pages/donate/donate';
import {ParticipatePage} from './pages/participate/participate';
import {EducatePage} from './pages/educate/educate';
import {PromotePage} from './pages/promote/promote';
import {ContactPage} from './pages/contact/contact';
import {AccountsettingsPage} from './pages/accountsettings/accountsettings';

// intermediate pages called from others
//import {RegisteredsigninPage} from './pages/registeredsignin/registeredsignin';
import {UnregisteredsigninPage} from './pages/unregisteredsignin/unregisteredsignin';
import {HomePage} from './pages/home/home';
import {InstructionsPage} from './pages/instructions/instructions';
import {FaqsPage} from './pages/faqs/faqs';
import {FindpollinglocationPage} from './pages/findpollinglocation/findpollinglocation';
import {AddpollinglocationPage} from './pages/addpollinglocation/addpollinglocation';
import {VideosPage} from './pages/videos/videos';
import {RegistrationsuccessPage} from './pages/registrationsuccess/registrationsuccess';
import {TempPage} from './pages/temp/temp';

// intermediate components called from others
//import {UserDataService} from './user-data-service';
import { Pollingstationservice } from './providers/pollingstationservice/pollingstationservice';
import { Volunteerservice } from './providers/volunteerservice/volunteerservice';
import {RestService} from './providers/rest-service/rest-service';

@Component({
  templateUrl: 'build/app.html',
  // config: {}, // http://ionicframework.com/docs/v2/api/config/Config/	  
  //providers: [UserDataService]
  providers: [Pollingstationservice, Volunteerservice, RestService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  //set back to HomePage after using TempPage
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  //userDataSvc: UserDataService;
  pollingStationService: Pollingstationservice;

  constructor(
    public platform: Platform,
      public menu: MenuController,
      //userDataSvc: UserDataService
      pollingStationService: Pollingstationservice,
      volunteerservice: Volunteerservice
      
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
       { title: 'Home', component: HomePage },
       { title: 'About', component: AboutPage },
       { title: 'Volunteer', component: VolunteerPage },
       { title: 'Donate', component: DonatePage },
       { title: 'Participate', component: ParticipatePage },
       { title: 'Audit Training', component: EducatePage },
       { title: 'Promote', component: PromotePage },
       { title: 'Contact Us', component: ContactPage },
       { title: 'Account', component: AccountsettingsPage },
       
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

enableProdMode();

ionicBootstrap(MyApp, [provideForms(), disableDeprecatedForms()]);
