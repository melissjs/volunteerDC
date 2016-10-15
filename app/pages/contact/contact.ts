import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ControlGroup,  AbstractControl} from '@angular/common';
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';




@Component({
  templateUrl: 'build/pages/contact/contact.html',
   //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class ContactPage {
contactForm: FormGroup;
/*authForm = new FormGroup({
  username: new FormControl(),
  password: new FormControl(),
});*/
 


constructor(private navCtrl: NavController, public fb: FormBuilder) {
var regExEmail: string = '\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b'
this.contactForm = fb.group({  
    'fullName': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    //'emailAddress': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z]*')])],
    'emailAddress': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(regExEmail)])],
    'message': ['', Validators.required],
    });

/*
this.contactForm.patchValue({
fullName: 'my name'
});
*/

  }

   onSubmit(value: string): void { 
        if(this.contactForm.valid) {
            console.log('Submitted value: ', value);
        }
   }

}
