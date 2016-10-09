
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
import {RegisteredsigninPage} from './pages/registeredsignin/registeredsignin';
import {UnregisteredsigninPage} from './pages/unregisteredsignin/unregisteredsignin';
import {HomePage} from './pages/home/home';
import {InstructionsPage} from './pages/instructions/instructions';
import {FaqsPage} from './pages/faqs/faqs';
import {VolunteerlistPage} from './pages/volunteerlist/volunteerlist';


// intermediate components called from others
//import {UserDataService} from './user-data-service';


@Component({
  templateUrl: 'build/app.html',
  // config: {}, // http://ionicframework.com/docs/v2/api/config/Config/	  
  //providers: [UserDataService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  //userDataSvc: UserDataService;

  constructor(
    public platform: Platform,
      public menu: MenuController
      //userDataSvc: UserDataService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
       { title: 'Home', component: HomePage },
       { title: 'About', component: AboutPage },
       { title: 'Volunteer', component: VolunteerPage },
       { title: 'Donate', component: DonatePage },
       { title: 'Participate', component: ParticipatePage },
       { title: 'Educate', component: EducatePage },
       { title: 'Promote', component: PromotePage },
       { title: 'Contact', component: ContactPage },
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

ionicBootstrap(MyApp, [provideForms(), disableDeprecatedForms()]);
