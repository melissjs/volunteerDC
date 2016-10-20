import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage} from '../home/home';

// forms
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  templateUrl: 'build/pages/participate/participate.html',
})
export class ParticipatePage {
collaboratorForm: FormGroup;
resetName: string;
resetAreasOfExpertise: string;
resetDesiredContribution: string;
resetRelevantLinks: string;
resetContact: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder) {
      this.navCtrl = navCtrl;

   
        //form stuff
        var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
        var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
        var regExAge: string = '[1]*[0-9]?[0-9]';
        var regExLettersOnly: string = '[a-ZA-Z]+';
        var regExNumbersOnly: string = '[0-9]*';
        var regExZip: string = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';

        this.collaboratorForm = fb.group({  
            'enterFullName': ['', Validators.required],
            'enterAreasOfExpertise': ['', Validators.required],
            'enterDesiredContribution': ['', Validators.required],
            'enterRelevantLinks': ['',Validators.required],
            'enterContact': ['', Validators.required]

        });
        
  // End Constructor
  }


onSubmit(value: any): void {


  // ask Eric about emailing a form value


// alert    
            
            let alert = this.alertCtrl.create({
                        title: 'Successfully Submitted',
                        subTitle: 'Thank you for your submission; we greatly appreciate your interest in participating. Someone will respond to you as soon as possible. Our team is small right now; please expect it may take us some time to reply.',
		buttons: [ 'OK' ]
                    });
                    alert.present(); 
                    	try {
		    this.navCtrl.setRoot(HomePage, {});
		} catch (EE) {
		    console.log('error in Submitting, exc='+ EE.toString())
		}
            }

/*
this.resetName = null;
this.resetAreasOfExpertise  = null;
this.resetDesiredContribution  = null;
this.resetRelevantLinks = null;
this.resetContact = null;
*/






// End class
}
