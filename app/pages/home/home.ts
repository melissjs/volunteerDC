import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

import {VolunteerPage} from '../volunteer/volunteer';
import {ActivatePage} from '../activate/activate';
import {DonatePage} from '../donate/donate';
import {Logincomponent} from '../logincomponent/logincomponent';
import {ResetpasswordPage} from '../resetpassword/resetpassword';

import {RestService} from '../../providers/rest-service/rest-service';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    buttonsDisabled: boolean;
    errorMessage: string;

  //userDataSvc: UserDataService;

  constructor(public navCtrl: NavController, navParams: NavParams, private restSvc: RestService) {

      this.navCtrl = navCtrl;
      this.buttonsDisabled = false;
      this.errorMessage = null;

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
                  that.buttonsDisabled = true;
                  that.navCtrl.push(ActivatePage, keyvalues);
                  setTimeout(()=>{
                      this.enableButtons();
                  },10000);
              } catch (EE) { 
                  that.buttonsDisabled = false;
                  console.log('error in Submitting, exc='+ EE.toString())
              }
              break;
          case 'reset/finish':
              try {
                  that.buttonsDisabled = true;
                  that.navCtrl.push(ResetpasswordPage, keyvalues);
                  setTimeout(()=>{
                      this.enableButtons();
                  },10000);
              } catch (EE) { 
                  that.buttonsDisabled = false;
                  console.log('error in Submitting, exc='+ EE.toString())
              }
              break;
              
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
           that.buttonsDisabled = true;
           that.navCtrl.push(VolunteerPage, {
            });
            setTimeout(()=>{
                this.enableButtons();
            },10000);
        } catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
            that.buttonsDisabled = false;
        }

}   

onDonateClick(){
var that = this;
        try {
           that.buttonsDisabled = true;
           that.navCtrl.push(DonatePage, {
                    
            });
            setTimeout(()=>{
                this.enableButtons();
            },10000);
        } catch (EE) { 
            that.buttonsDisabled = false;
            console.log('error in Submitting, exc='+ EE.toString())
        }
}  

onLoginClick(){
    var that = this;
    try {
        that.buttonsDisabled = true;
        console.log('about to setroot login component...');
        that.navCtrl.setRoot(Logincomponent);
        setTimeout(()=>{
            this.enableButtons();
        },10000);
    } catch (EE) { 
        that.buttonsDisabled = false;
        console.log('error in Submitting, exc='+ EE.toString())
    }
}  

onLogout() {
    this.restSvc.onLogout(this,this.displayError);
}

    displayError(that:any,text: string,subtitle: string) {
        that.errorMessage = text + ':' + subtitle;
    }


enableButtons() {
    this.buttonsDisabled = false;
}

}
