import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

import {VolunteerPage} from '../volunteer/volunteer';
import {ActivatePage} from '../activate/activate';
import {DonatePage} from '../donate/donate';



@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {


  //userDataSvc: UserDataService;

  constructor(public navCtrl: NavController, navParams: NavParams) {

      this.navCtrl = navCtrl;

      // Obtain all args (key=val) format and store to nav params (keyvalues)

      var locStr = window.location.toString();
      var pagerefidx = locStr.indexOf("#/");
      var keyvalidx;
      var pageref;
      var keyvalstart;
      var keyvalpair;

      console.log('url val=' + window.location);

      if (pagerefidx > 0) {
          keyvalidx = locStr.indexOf("?");
          if (keyvalidx < 0) {
              pageref = locStr.substr(pagerefidx+2);
          } else {
              pageref = locStr.substring(pagerefidx+2,keyvalidx);
          }
          console.log('page ref = ' + pageref);

          var keyvalues = new NavParams();
          if (keyvalidx >= 0) {
              keyvalstart = locStr.substr(keyvalidx+1);
              keyvalpair = keyvalstart.split('&')
              // Loop through items
              var x = 0;
              for (x = 0; x < keyvalpair.length; x++)
              {
                  // Split the key from the value
                  var splitted=keyvalpair[x].split('=');
                  keyvalues.data[splitted[0]] = splitted[1];
                  console.log('key,value[' + splitted[0] + '] = ' + keyvalues.data[splitted[0]]);
              }
          }
          var that = this;
          switch (pageref) {
              case 'activate':
              try {
                  that.navCtrl.push(ActivatePage, keyvalues);
              } catch (EE) { 
                  console.log('error in Submitting, exc='+ EE.toString())
              }
          }
      } else {
          console.log('no url specified');
      }
  }

   /* onSubmit() {
        var that = this;
        try {
           that.navCtrl.push(QuestionsPage, {
                    userDataSvc: this.userDataSvc
            });

        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }*/
    
onVolunteerClick(){
    var that = this;
        try {
           that.navCtrl.push(VolunteerPage, {
                    
            });
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }

}   

onDonateClick(){
var that = this;
        try {
           that.navCtrl.push(DonatePage, {
                    
            });
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
        }
}  




}
