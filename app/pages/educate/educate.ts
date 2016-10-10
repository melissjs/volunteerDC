import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {InstructionsPage} from '../instructions/instructions';
import {FaqsPage} from '../faqs/faqs';
import {VideosPage} from '../videos/videos';




@Component({
  templateUrl: 'build/pages/educate/educate.html',
})
export class EducatePage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }

  onSubmitInstructions(){
        var that = this;
        try {
            
                that.navCtrl.push(InstructionsPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
  }

    onSubmitFAQs(){
        var that = this;
        try {
            
                that.navCtrl.push(FaqsPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
  }

    onSubmitVideos(){
        var that = this;
        try {
            
                that.navCtrl.push(VideosPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
  }

}
