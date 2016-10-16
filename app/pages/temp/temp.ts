import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
import { PollingStation} from '../../pollingstation';
//import {VotePage} from '../vote/vote';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { PollingstationdetailsPage } from '../pollingstationdetails/pollingstationdetails';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';

import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  templateUrl: 'build/pages/temp/temp.html',
  inputs: ['pollingstation', 'volunteer'],
  directives: [PollingstationComponent],
})
export class TempPage {
changeForm: FormGroup;
currentVolunteer: Volunteer; 
exposedYesOrNo: string;
volunteerservice: Volunteerservice;
pollingstationservice: Pollingstationservice;
currentTempVolunteer: Volunteer;
thisTempStation: PollingStation;
thisTempStationPrecint: string;
printedShifts: string;
fullVolunteerKeyList: string[];
fullVolunteerList: Volunteer[];
wasTouched: boolean;

  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, pollingstationservice: Pollingstationservice, public fb: FormBuilder, private alertCtrl: AlertController) {
      this.navCtrl = navCtrl;
      this.volunteerservice = volunteerservice; 
      this.pollingstationservice = pollingstationservice;
      if(volunteerservice.currentVolunteer!==null){
      this.currentVolunteer = volunteerservice.getNewVolunteer();
        }

this.currentTempVolunteer = {
volunteerKey: 'v5',
fullName: 'Raya Hammond',
emailAddress: 'email@email.com',
exposeEmail: true,
phoneNumber: '602-453-5544',
age: 23,
sex: 'Female',
partyAffiliation: 'Other Party',
shifts:['Late Morning', 'Early Evening', 'Early Morning', 'Late Evening'], //'Late Morning', 'Early Evening'
passcode: 'passcodestring',
associatedPollingStationKey:'ps1', 
totalRecords: 0,
totalVoteRecords: 0,
totalAnomalyRecords: 0,
totalAmendmentRecords: 0,
} 

    //form stuff
    var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
    var regExPhone: string = '*';
this.changeForm = fb.group({  
    'fullNameCtrl': [this.currentTempVolunteer.fullName, Validators.compose([Validators.required])],
    'emailAddressCtrl': [this.currentTempVolunteer.emailAddress, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExEmail)])],
    'exposeEmailCtrl': [this.currentTempVolunteer.exposeEmail, Validators.required],
    'phoneNumberCtrl': [this.currentTempVolunteer.phoneNumber, Validators.required],
    'ageCtrl': [this.currentTempVolunteer.phoneNumber, Validators.required],
    'sexCtrl': [this.currentTempVolunteer.sex, Validators.required],
    'partyAffiliationCtrl': [this.currentTempVolunteer.partyAffiliation, Validators.required],
    'shiftsCtrl': [this.currentTempVolunteer.shifts, Validators.required],
    'passcodeCtrl': [this.currentTempVolunteer.passcode, Validators.required],
    });

  
  //end form stuff
      
      //setVolunteer to be erased
      volunteerservice.setNewVolunteer(this.currentTempVolunteer);
      

      // get exposed value
      if(volunteerservice.currentVolunteer!==null){
      this.exposedYesOrNo = this.volunteerservice.isEmailExposed(this.currentTempVolunteer);
      }


      //get shift printout
      this.printedShifts = this.volunteerservice.printShifts(this.currentTempVolunteer);

      this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentTempVolunteer.associatedPollingStationKey)
      this.thisTempStationPrecint = this.thisTempStation.precinctNumber;

      //get associate volunteer keys
      this.fullVolunteerKeyList = this.pollingstationservice.getAssociatedVolunteerKeyList(this.currentTempVolunteer.associatedPollingStationKey);

      //make array of associated volunteerservices
      this.fullVolunteerList = this.volunteerservice.getVolunteerArrayByKeyList(this.fullVolunteerKeyList);

//end constructor
  }

  askExpose(){
     let confirm = this.alertCtrl.create({
                title: 'Would you like to expose your email address to your team?',
                message: 'This will help you organize with each other before and on election day. You can change this setting later in your account.',
                buttons: [
                    {
                    text: 'No',
                    handler: () => {
                        this.currentTempVolunteer.exposeEmail = false;
                        this.exposedYesOrNo = "No";
                        console.log('Disagree clicked' + this.currentTempVolunteer.exposeEmail);
                    }
                    },
                    {
                    text: 'Yes',
                    handler: () => {
                        this.currentTempVolunteer.exposeEmail = true;
                        this.exposedYesOrNo = "Yes";
                        console.log('Agree clicked' + this.currentTempVolunteer.exposeEmail);
                        
                    }
                    }
                ]
                });
                confirm.present();
  }






presentConfirm() {

    // Object with options used to create the alert
    var options = {
      //title: 'Choose Sex',
      //message: 'Which name do you like?',
      inputs: [
        { 
          name : 'options', 
          value: 'Female', 
          label: 'Female', 
          type: 'radio' 
        }, { 
          name : 'options', 
          value: 'Male', 
          label: 'Male', 
          type: 'radio' 
        },{ 
          name : 'options', 
          value: 'noAnwser', 
          label: 'No Answer', 
          type: 'radio' 
        },
          ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data);
          }
        }
      ]
    };
 let alert = this.alertCtrl.create(options);
    alert.present();
}


askSex(){
  this.presentConfirm();
}

askShifts(){
   let confirm = this.alertCtrl.create({
                title: 'Would you like to cancel your shifts?',
                message: 'If you want to change times or stations, head over to the polling station pages. Get to the station you are currently signed up for by clicking on the address above.',
                buttons: [
                    {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked' + this.currentTempVolunteer.shifts);
                    }
                    },
                    {
                    text: 'Yes',
                    handler: () => {
                        this.volunteerservice.clearShifts()
                        this.printedShifts = "None";
                        console.log('Agree clicked' + this.currentTempVolunteer.shifts);
                        
                    }
                    }
                ]
                });
                confirm.present();
  }


      wasThisTouched(){
        this.wasTouched = true;
      }





       onSubmit(value: string): void {
        var that = this;


        if(this.changeForm.valid) {
            console.log('Submitted value: ', value);
        }



        try {
                //that.navCtrl.push(VotePage, {
                //});
            

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }


      goToStationDetails(){
  console.log('thisTempStation'+ this.thisTempStation);
  this.pollingstationservice.setStation(this.thisTempStation);
  var that = this;
         try {
            
                this.navCtrl.push(PollingstationdetailsPage, {
                  });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
  }
  

}
