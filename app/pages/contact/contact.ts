import { Component } from '@angular/core';
import { EmailComposer } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';
//import { ControlGroup,  AbstractControl} from '@angular/common';
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomePage} from '../home/home';
import {ContactFormObject} from '../../contactObj'



@Component({
  templateUrl: 'build/pages/contact/contact.html',
   //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class ContactPage {
contactForm: FormGroup;
email: any;
contactFormObj: ContactFormObject;
 


constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder) {
this.navCtrl = navCtrl;
this.contactFormObj = null;
var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*'
this.contactForm = fb.group({  
    'fullName': ['', Validators.compose([Validators.required])],
    //'emailAddress': ['', Validators.compose([Validators.required])],
    //'emailAddress': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z]*')])],
    'emailAddress': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExEmail)])],
    'message': ['', Validators.required],
    });


  }










   onSubmit(value: any): void { 


this.contactFormObj ={
fullName: value.fullName,
emailAddress: value.emailAddress,
message: value.message
} 

console.log(this.contactFormObj);



  let alert = this.alertCtrl.create({
                                        title: 'Submission Successful',
                                        subTitle: 'Thank you for contacting us. Someone will respond to you as soon as possible. Our team is small right now; please expect it may take us some time to reply.',
                                        buttons: [ 'OK' ]
                                        });
                           alert.present();

                    try {
                        this.navCtrl.push(HomePage, {});
                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    }

         


   }

   
   
  

}
